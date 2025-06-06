"use client";

import { Dish } from "@prisma/client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import YouTube, { YouTubeProps } from "react-youtube";
import StyleTag from "./tags";
import ImageView from "./image-view";
import Navbar from "./navbar";

type Props = {
  dish: Dish;
};

const opts: YouTubeProps["opts"] = {
  height: "200",
  width: "300",
  playerVars: {
    autoplay: 0,
  },
};

const DishPage = ({ dish }: Props) => {
  return (
    <div className="min-h-screen w-full ">
      <Navbar />

      <div className="h-full w-full p-5 flex flex-col gap-5 overflow-auto">
        <ImageView id={dish.id} />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-4">
            <Card className="rounded-sm">
              <CardHeader className=" py-2 px-4">
                <CardTitle className="text-lg font-semibold">
                  {dish.dish_name}
                </CardTitle>
                <CardDescription className=" text-xs">
                  {dish.dish_description}
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="rounded-sm py-2 px-0 ">
              <CardContent className="flex flex-wrap gap-2 px-3 py-1">
                {Object.entries(dish.type || {}).map(([key, value]) => {
                  if (!value) return null;
                  return <StyleTag key={key} text={key} />;
                })}
                {Object.entries(dish.preferenes || {}).map(([key, value]) => {
                  if (!value) return null;
                  return <StyleTag key={key} text={key} />;
                })}
                {Object.entries(dish.preferences_taste || {}).map(
                  ([key, value]) => {
                    if (!value) return null;
                    return <StyleTag key={key} text={key} />;
                  }
                )}
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader className="py-2">
                <CardTitle className="text-lg font-semibold">
                  Ingredients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm">
                  {dish.ingredients.map((e: string) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-2 md:col-span-3 flex flex-col gap-4">
            <div className="flex gap-4 overflow-x-auto">
              {dish.youtube_link.map((videoUrl, index) => (
                <div key={index} className="flex-shrink-0 w-72">
                  <YouTube videoId={videoUrl} opts={opts} />
                </div>
              ))}
            </div>

            <Card className="">
              <CardHeader className="py-2">
                <CardTitle className="text-lg font-semibold">Recipe</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm">
                  {dish.recipe.map((e: string) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishPage;
