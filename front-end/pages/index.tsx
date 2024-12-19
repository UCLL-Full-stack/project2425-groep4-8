import Head from "next/head";
import Image from "next/image";
import Header from "@/components/header";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  // const loggedInUser = sessionStorage.getItem("loggedInUser");

  const { t } = useTranslation();

  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "chefjohn", password: "chef123", role: "chef" },
    { username: "reviewerjane", password: "review123", role: "reviewer" },
  ];

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

      <main className="flex flex-col items-center justify-center min-h-screen bg-green-800">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-wide">
            {t("pages.home.welcome")}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            {t("pages.home.share")}
          </p>
          <div className="  flex justify-center">
            <table className="bg-white border border-gray-200 shadow-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">{t("home.username")}</th>
                  <th className="px-4 py-2 border">{t("home.password")}</th>
                  <th className="px-4 py-2 border">{t("home.role")}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border">{user.username}</td>
                    <td className="px-4 py-2 border">{user.password}</td>
                    <td className="px-4 py-2 border">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
