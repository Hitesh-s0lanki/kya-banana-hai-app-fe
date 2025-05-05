"use client";

import { useGetRecipe } from "@/actions/recipe/features";
import DishPage from "@/components/dish-page";

type Props = {
    params: { recipeId: string }
};

const RecipeIdPage = ({
    params
}: Props) => {

    const { data: recipe, isError, error, isLoading } = useGetRecipe(params.recipeId)

    if (isError) return <p>{error.message}</p>

    if (isLoading || !recipe) {
        return (
            <div className=" h-full w-full flex justify-center items-center">
                Loading...
            </div>
        )
    }

    return (
        <DishPage dish={recipe} />
    );
};

export default RecipeIdPage;