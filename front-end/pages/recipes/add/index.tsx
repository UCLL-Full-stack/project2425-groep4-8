import React, { useEffect, useState } from "react";

import Head from "next/head";
import Header from "@/components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AddRecipe from "@/components/recipes/AddRecipe";
import { User } from "@/types";

const Recipes: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Add Recipe</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-r px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            {t("pages.recipe.recipes")}
          </h1>

          {loggedInUser ? (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                {t("overview.recipes")}
              </h2>
              <AddRecipe />
            </section>
          ) : (
            <p className="text-center text-gray-300">{t("home.nologin")}</p>
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
