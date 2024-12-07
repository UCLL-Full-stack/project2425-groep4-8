import React, { useEffect, useState } from "react";
import IngredientOverviewTable from "../../components/ingredients/IngredientOverviewTable";
import IngredientService from "../../services/IngredientService";
import { Ingredient } from "../../types";
import Head from "next/head";
import Header from "@/components/header";

const Ingredients: React.FC = () => {
  const [ingredients, setIngredient] = useState<Ingredient[]>([]);

  const getIngredients = async () => {
    try {
      const response = await IngredientService.getAllIngredients();
      const data = await response.json();
      setIngredient(data);
    } catch (error) {
      console.error("Failed to fetch ingredients", error);
    }
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <>
      <Head>
        <title>Ingredients</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-r px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Ingredients</h1>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Ingredients Overview
            </h2>
            {ingredients.length > 0 ? (
              <IngredientOverviewTable ingredients={ingredients} />
            ) : (
              <p className="text-center text-gray-300">
                No ingredients available
              </p>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Ingredients;
