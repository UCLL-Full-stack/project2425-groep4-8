import React, { useEffect, useState } from "react";
import RecipeOverviewTable from "../../components/recipes/RecipeOverviewTable";
import RecipeDetails from "../../components/recipes/RecipeDetail";
import RecipeService from "../../services/RecipeService";
import { Recipe, User } from "../../types";
import Head from "next/head";
import Header from "@/components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import UpdateRecipeForm from "@/components/recipes/UpdateRecipe";

const Recipes: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }

    console.log("user " + user);
  }, []);

  const getRecipes = async () => {
    try {
      const response = await RecipeService.getAllRecipes();
      const recipes = await response.json();
      return { recipes };
    } catch (error) {
      console.error("Failed to fetch recipes", error);
    }
  };

  // useEffect(() => {
  //   getRecipes();
  // }, []);

  const { data, isLoading, error } = useSWR(["recipes"], getRecipes);

  useInterval(() => {
    mutate(getRecipes);
  }, 5000);

  const handleUpdate = () => {
    mutate(["recipes"]);
  };

  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-r px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            {t("pages.recipe.recipes")}
          </h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {t("overview.recipes")}
            </h2>
            {loggedInUser ? (
              data?.recipes.length > 0 ? (
                <>
                  <section className="flex justify-center">
                    <Link
                      href="/recipes/add"
                      className=" bg-slate-400 text-white tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ease-in-out  hover:bg-slate-800"
                    >
                      Add a recipe
                    </Link>
                  </section>
                  <RecipeOverviewTable
                    recipes={data?.recipes}
                    selectRecipe={setSelectedRecipe}
                  />
                </>
              ) : (
                <p className="text-center text-gray-300">
                  {t("pages.recipe.not")}
                </p>
              )
            ) : (
              <p className="text-center text-gray-300">{t("home.nologin")}</p>
            )}
          </section>

          {selectedRecipe && !isUpdating && (
            <section className="bg-slate-400 rounded-lg p-6 shadow-lg">
              <h2 className="text-3xl text-white font-semibold">
                Details for {selectedRecipe.name}
              </h2>
              <RecipeDetails
                recipe={selectedRecipe}
                onClose={closeRecipeDetails}
              />
              {loggedInUser?.role === "chef" && (
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => setIsUpdating(true)}
                >
                  Update Recipe
                </button>
              )}
            </section>
          )}

          {selectedRecipe && isUpdating && (
            <UpdateRecipeForm
              recipe={selectedRecipe}
              onClose={() => setIsUpdating(false)}
              onUpdate={handleUpdate}
            />
          )}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Recipes;
