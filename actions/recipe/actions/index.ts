"use server";

import { z } from "zod";
import { RecipeSchema } from "@/schema/index.schema";
import { currentUserId } from "@/lib/auth";
import prismadb from "@/lib/db";
import Openai from "openai";
import axios from "axios";
import {
    S3Client,
    GetObjectCommand,
    HeadObjectCommand,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const YOUTUEB_BASE_URL = "https://www.googleapis.com/youtube/v3";
const bucket = "eventcrm.io"

const openai = new Openai({
    apiKey: process.env.OPENAI_API_KEY,
});

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export const create = async (values: z.infer<typeof RecipeSchema>) => {
    try {
        const user_id = await currentUserId();
        if (!user_id) throw new Error("User not Found!");

        const { prompt, ...info } = values;

        // Filter out false values from the preferences
        const filterFalseValues = (obj: Record<string, boolean>) => {
            return Object.fromEntries(
                Object.entries(obj).filter(([_, value]) => value === true)
            );
        };

        const filteredValues = {
            type: filterFalseValues(values.type),
            meal: filterFalseValues(values.meal),
            preferenes: filterFalseValues(values.preferenes),
            preferences_taste: filterFalseValues(values.preferences_taste),
        };

        const content = JSON.stringify(filteredValues);
        const dishs = await findAll()

        const magic_prompt = `
          You are a top chef. Your task is to generate the best dish with recipe details based on the following preferences:
  
          ${content}
  
          Consider the opinion of the person 
          ''' ---------- Opinion of the person ----------------------------------------'''

          ${prompt}
          
          ''' ---------- Opinion of the person ----------------------------------------'''.
  
          Provide an output in JSON format with the following key values: 
          {
              "dish_name": string,
              "dish_description": string,
              "ingredients": array of string, // List the ingredients with quantities
              "recipe": array of string // List the steps
          }
  
          ${dishs.length !== 0
                ? `
          Note: Dish should be different from the previous dishes. 
          Previous = [${dishs.map((dish) => dish.dish_name).join(", ")}].`
                : ""
            }
        `;

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant designed to output JSON.",
                },
                { role: "user", content: magic_prompt },
            ],
            model: "gpt-4-turbo",
            response_format: { type: "json_object" },
        });

        if (completion.choices[0].message.content) {
            const json = JSON.parse(completion.choices[0].message.content);

            const videos = await getVideos(
                `Generate the recipe videos ${json["dish_name"]}`
            );

            // Initialize the youtube_link array if it doesn't exist
            if (!json["youtube_link"]) {
                json["youtube_link"] = [];
            }

            // Correctly append video URLs using push
            videos?.forEach((video: any) => {
                json["youtube_link"].push(`${video.id.videoId}`);
            });

            const data: any = {
                dish_name: json["dish_name"] || "",
                dish_description: json["dish_description"] || "",
                ingredients: json["ingredients"] || [],
                recipe: json["recipe"] || [],
                user_id,
                image_key: null,
                youtube_link: json["youtube_link"] || [],
                ...info,
            };

            const dish = await prismadb.dish.create({
                data,
            });

            return dish.id;
        }

        throw new Error("Failed to generate Recipe!");
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const findAll = async () => {
    try {
        const user_id = await currentUserId()

        if (!user_id) {
            throw new Error("User Access token not found!");
        }

        const recipes = await prismadb.dish.findMany({ where: { user_id: user_id }, orderBy: { created_at: "desc" } });

        return recipes;
    } catch (error) {
        throw error
    }
};

export const findOne = async (id?: string) => {
    try {

        if (!id) throw new Error("Id not Found!")

        const userId = await currentUserId();

        if (!userId) throw new Error("User not Found!");

        const recipe = await prismadb.dish.findUnique({ where: { id } });

        if (!recipe) throw new Error("Recipe Not Found!")

        return recipe
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getVideos = async (query: String) => {
    const params = {
        part: "snippet",
        q: query,
        maxResults: 5,
        videoDuration: "medium",
        type: "video",
        key: "AIzaSyBiAoMxqleKfA-iRjd_-h5g6ceGEXljE5o",
    };
    const resp = await axios.get(YOUTUEB_BASE_URL + "/search", { params });
    return resp.data.items;
};

export const getImageUrl = async (id?: string) => {
    try {

        if (!id) throw new Error("Id not Found!")

        const userId = await currentUserId();

        if (!userId) throw new Error("User not Found!");

        const recipe = await prismadb.dish.findUnique({ where: { id } });

        if (!recipe || !recipe.dish_name) throw new Error("Recipe Not Found!")

        const key = `dish/${recipe.dish_name.split(" ").join("_") + ".png"}`;
        const keyExists = await getFileNameFromS3(key);

        let s3_key = key

        if (!keyExists) {
            const response = await openai.images.generate({
                model: "dall-e-3",
                prompt: `
                Dish name = ${recipe.dish_name} dish
                
                Description : ${recipe?.dish_description}
                `,
                n: 1,
                size: "1792x1024"
            });

            const image_url = response.data[0].url;

            if (!image_url) throw new Error("Failed to Generated Image")

            const s3Url = await downloadAndUploadImage(image_url, recipe.dish_name.split(" ").join("_") + ".png");

            s3_key = s3Url
        }

        if (!keyExists || !recipe.image_key) {
            await prismadb.dish.update({
                where: { id },
                data: {
                    image_key: s3_key
                }
            })
        }

        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: s3_key,
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        return url;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const downloadImage = async (url: string): Promise<Buffer> => {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'arraybuffer',
    });
    return response.data;
}

const uploadToS3 = async (buffer: Buffer, filename: string) => {
    const key = `dish/${filename}`

    const command = new PutObjectCommand({
        Bucket: 'eventcrm.io',
        Key: key,
        Body: buffer,
        ContentType: 'image/png',
    });

    await s3Client.send(command);

    return key
}

const downloadAndUploadImage = async (url: string, filename: string): Promise<string> => {
    const imageBuffer = await downloadImage(url);
    const s3Url = await uploadToS3(imageBuffer, filename);
    return s3Url;
}

const getFileNameFromS3 = async (key: string) => {
    try {
        // First, check if the key exists by trying to get the head of the object
        const headCommand = new HeadObjectCommand({
            Bucket: bucket,
            Key: key,
        });

        try {
            await s3Client.send(headCommand);
            return true; // If no error, the key exists
        } catch (error: any) {
            if (error.name === 'NotFound') {
                return false; // Key doesn't exist
            } else {
                throw error; // Throw other errors
            }
        }
    } catch (error) {
        console.error('Error checking file existence in S3:', error);
        throw error;
    }
}