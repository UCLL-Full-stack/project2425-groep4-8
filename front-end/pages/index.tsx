import Head from "next/head";
import Image from "next/image";
import Header from "@/components/header";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  // const loggedInUser = sessionStorage.getItem("loggedInUser");

  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Head>
        <title>TasteBuddy</title>
        <meta
          name="description"
          content="Een platform om recepten te delen en nieuwe gerechten te ontdekken."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="flex items-center justify-center min-h-screen bg-green-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-60 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-wide">
            {t("pages.home.welcome")}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            {t("pages.home.share")}
          </p>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
