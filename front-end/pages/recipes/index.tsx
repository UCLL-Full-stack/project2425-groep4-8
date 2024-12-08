import React, { useEffect, useState } from "react";
import RecipeOverviewTable from "../../components/recipes/RecipeOverviewTable";
import RecipeDetails from "../../components/recipes/RecipeDetail";
import RecipeService from "../../services/RecipeService";
import { Recipe } from "../../types";
import Head from "next/head";
import Header from "@/components/header";

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const getRecipes = async () => {
    try {
      const response = await RecipeService.getAllRecipes();
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Failed to fetch recipes", error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-r px-6 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-center mb-8">Recipes</h1>

          {/* Recipes Overview Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Recipes Overview
            </h2>
            {recipes.length > 0 ? (
              <RecipeOverviewTable
                recipes={recipes}
                selectRecipe={setSelectedRecipe}
              />
            ) : (
              <p className="text-center text-gray-300">No recipes available</p>
            )}
          </section>

          {/* Recipe Details Section */}
          {selectedRecipe && (
            <section className="bg-gray-700 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Details for {selectedRecipe.name}
              </h2>
              <RecipeDetails
                recipe={selectedRecipe}
                onClose={closeRecipeDetails}
              />
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default Recipes;
