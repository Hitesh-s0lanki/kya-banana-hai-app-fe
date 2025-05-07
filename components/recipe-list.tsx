"use client";

import { Dish } from "@prisma/client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import MenuItemImg from "./menu-item-img";
import { PlusCircle } from "lucide-react";
import ImageListRecipe from "./image-recipe-list";

type Props = {
  dishs: Dish[];
};

const RecipeList = ({ dishs }: Props) => {
  const router = useRouter();

  return (
    <div className=" min-h-screen w-full flex flex-col gap-2 p-8 bg-gradient-to-r from-green-100 via-blue-200 to-purple-400 inset-0 overflow-auto">
      <div className="flex flex-col gap-5">
        <h1 className=" text-xl font-semibold text-center">Previous Recipes</h1>
        <div className=" grid grid-cols-5 gap-5">
          {dishs.map((dish) => (
            <div
              key={dish.id}
              onClick={() => router.push(`/recipe/${dish.id}`)}
              className=" bg-white rounded-md p-4 shadow-sm hover:shadow-lg cursor-pointer  flex flex-col justify-between gap-4">
              <div className="w-full flex justify-center">
                <ImageListRecipe id={dish.id} />
              </div>
              <div className="px-2 flex flex-col gap-2">
                <h2 className=" text-md font-semibold">{dish.dish_name}</h2>
                <p className=" text-xs text-muted-foreground">
                  {dish.dish_description?.slice(0, 100)}
                </p>
                <div className=" text-xs mt-2">
                  Date : {format(dish.created_at, "dd/MM/yyyy")}
                </div>
              </div>
            </div>
          ))}
          <div
            onClick={() => router.push(`/`)}
            className=" hover:shadow-lg cursor-pointer  flex flex-col justify-center items-center bg-white p-4 rounded-md">
            <div className=" flex flex-col justify-center items-center gap-4">
              <PlusCircle className=" text-muted-foreground h-16 w-16" />
              <h2 className=" text-xl font-semibold text-muted-foreground">
                Add New
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
