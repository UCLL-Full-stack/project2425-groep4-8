import React, { useEffect, useState } from "react";
import IngredientOverviewTable from "../../components/ingredients/IngredientOverviewTable";
import IngredientService from "../../services/IngredientService";
import { Ingredient } from "../../types";
import Head from "next/head";
import Header from "@/components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Ingredients</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-r px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">{t("pages.ingredient.ingredients")}</h1>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {t("overview.ingredients")}
            </h2>
            {ingredients.length > 0 ? (
              <IngredientOverviewTable ingredients={ingredients} />
            ) : (
              <p className="text-center text-gray-300">
                {t("pages.ingredient.not")}
              </p>
            )}
          </section>
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

export default Ingredients;
