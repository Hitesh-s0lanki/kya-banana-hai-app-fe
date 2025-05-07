"use client";

import { useGetRecipes } from "@/actions/recipe/features";
import RecipeList from "@/components/recipe-list";

const RecipePage = () => {
  const { data: recipes, isError, error } = useGetRecipes();

  if (isError) {
    return <p>{error.message}</p>;
  }

  return <RecipeList dishs={recipes || []} />;
};

export default RecipePage;
