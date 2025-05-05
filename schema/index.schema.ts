import { z } from "zod";

export const RecipeSchema = z.object({
    type: z.object({
        veg: z.boolean().default(false),
        non_veg: z.boolean().default(false),
        vegan: z.boolean().default(false),
        eggs: z.boolean().default(false),
    }),
    meal: z.object({
        breakfast: z.boolean().default(false),
        lunch: z.boolean().default(false),
        dinner: z.boolean().default(false),
        snacks: z.boolean().default(false),
    }),
    preferenes: z.object({
        rajasthani: z.boolean().default(false),
        gujarati: z.boolean().default(false),
        punjabi: z.boolean().default(false),
        south_indian: z.boolean().default(false),
        chinese: z.boolean().default(false),
        italian: z.boolean().default(false),
        mexican: z.boolean().default(false),
    }),
    preferences_taste: z.object({
        spicy: z.boolean().default(false),
        sweet: z.boolean().default(false),
        savory: z.boolean().default(false),
        sour: z.boolean().default(false),
    }),
    prompt: z.string().optional()
});