import React, { useEffect, useState } from "react";
import Userservice from "../../services/UserService";
import { User } from "../../types";
import Head from "next/head";
import Header from "@/components/header";
import UserLoginForm from "@/components/users/UserLoginForm";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Login: React.FC = () => {
  const { t } = useTranslation();

  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "chefjohn", password: "chef123", role: "chef" },
    { username: "reviewerjane", password: "review123", role: "reviewer" },
  ];

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-r px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Users</h1>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
            <UserLoginForm />
          </section>
        </div>
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

export default Login;
