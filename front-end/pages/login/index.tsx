import React, { useEffect, useState } from "react";
import Userservice from "../../services/UserService";
import { User } from "../../types";
import Head from "next/head";
import Header from "@/components/header";
import UserLoginForm from "@/components/users/UserLoginForm";

const Login: React.FC = () => {
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
      </main>
    </>
  );
};

export default Login;
