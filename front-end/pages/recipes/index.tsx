import React, { useEffect, useState } from "react";
import RecipeOverviewTable from "../../components/recipes/RecipeOverviewTable";
import RecipeDetails from "../../components/recipes/RecipeDetail";
import RecipeService from "../../services/RecipeService";
import { Recipe } from "../../types";
import Head from "next/head";
import Header from "@/components/header";
import styles from "../../styles/Home.module.css";

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
      <main className={styles.mainContainer}>
        <h1 className={styles.title}>Recipes</h1>
        <section>
          <h2 className={styles.sectionTitle}>Recipes Overview</h2>
        </section>
        {recipes.length > 0 ? (
          <RecipeOverviewTable
            recipes={recipes}
            selectRecipe={setSelectedRecipe}
          />
        ) : (
          <p className={styles.noRecipes}>No recipes available</p>
        )}
        {selectedRecipe && (
          <>
            <h2 className={styles.recipeDetailsTitle}>
              Details for {selectedRecipe.name}
            </h2>
            <RecipeDetails
              recipe={selectedRecipe}
              onClose={closeRecipeDetails}
            />
          </>
        )}
      </main>
    </>
  );
};

export default Recipes;
