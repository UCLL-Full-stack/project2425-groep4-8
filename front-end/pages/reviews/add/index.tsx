import React, { useEffect, useState } from "react";

import Head from "next/head";
import Header from "@/components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AddReview from "@/components/reviews/AddReview";

const Recipes: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Add Review</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-r px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            {t("pages.review.reviews")}
          </h1>

          <section className="mb-12">
            <AddReview />
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

export default Recipes;