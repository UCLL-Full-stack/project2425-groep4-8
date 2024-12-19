import React, { useEffect, useState } from "react";
import UserOverviewTable from "../../components/users/UserOverviewTable";
import Userservice from "../../services/UserService";
import { User } from "../../types";
import Head from "next/head";
import Header from "@/components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserService from "../../services/UserService";

const Users: React.FC = () => {
  const [users, setUser] = useState<User[]>([]);
  const [error, setError] = useState<String>();
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }

    console.log("user " + user);
  }, []);

  const getUsers = async () => {
    try {
      const response = await Userservice.getAllUsers();
      if (!response.ok) {
        if (response.status === 401) {
          setError("You are not authorized to view this page.");
        } else {
          setError(response.statusText);
        }
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await UserService.deleteUser(id);
      setUser((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-r px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            {t("pages.user.users")}
          </h1>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {t("overview.users")}
            </h2>
            {loggedInUser?.role === "admin" ? (
              users.length > 0 ? (
                <UserOverviewTable users={users} onDelete={deleteUser} />
              ) : (
                <p className="text-center text-gray-300">
                  {t("pages.user.not")}
                </p>
              )
            ) : (
              <p className="text-center text-gray-300">{t("home.nologin")}</p>
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

export default Users;
