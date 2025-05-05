"use client";

import { useGetRecipes } from "@/actions/recipe/features";
import RecipeList from "@/components/recipe-list";

// import RecipeList from "@/components/recipe-list";
// import { getAllDish } from "@/lib/recipe.actions";

// type Props = {};

// const RecipePage = async ({ }: Props) => {
//     try {
//         const dishs = await getAllDish()

//         return (
//             <RecipeList dishs={dishs} />
//         );

//     } catch (error: any) {
//         return (
//             <div className=" h-full w-full flex justify-center items-center text-destructive-foreground text-lg text-black">
//                 {error.message}</div>
//         )
//     }
// };

// export default RecipePage;

const RecipePage = () => {

    const { data: recipes, isError, error } = useGetRecipes()

    if (isError) {
        return (
            <p>{error.message}</p>
        )
    }

    return (
        <RecipeList dishs={recipes || []} />
    );
};

export default RecipePage;