import React, { useEffect, useState } from "react";
import Userservice from "../../services/UserService";
import { User } from "../../types";
import Head from "next/head";
import Header from "@/components/header";
import UserLoginForm from "@/components/users/UserLoginForm";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserRegisterForm from "@/components/users/UserRegisterForm";

const Login: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-r px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Register
            </h2>
            <UserRegisterForm />
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

export default Login;
