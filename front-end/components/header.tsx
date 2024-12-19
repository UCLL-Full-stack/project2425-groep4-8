import { User } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Language from "./language/language";
import { useTranslation } from "next-i18next";

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }

    console.log("user " + user);
  }, []);

  const handleClick = () => {
    sessionStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    setLoggedInUser(null);
  };

  const { t } = useTranslation();

  return (
    <header className="py-4 bg-gradient-to-r from-gray-800 to-gray-600 shadow-md bg-black">
      <nav className="flex justify-center gap-6">
        <Link
          href="/"
          className="text-gray-100 uppercase font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-slate-800"
        >
          Home
        </Link>
        {loggedInUser && (
          <Link
            href="/ingredients"
            className="text-gray-100 uppercase font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-slate-800"
          >
            {t("home.ingredients")}
          </Link>
        )}
        {loggedInUser && (
          <Link
            href="/recipes"
            className="text-gray-100 uppercase font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ease-in-out  hover:bg-slate-800"
          >
            {t("home.recipes")}
          </Link>
        )}
        {loggedInUser && (
          <Link
            href="/reviews"
            className="text-gray-100 uppercase font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-slate-800"
          >
            {t("home.reviews")}
          </Link>
        )}
        {loggedInUser && loggedInUser.role === "admin" && (
          <Link
            href="/users"
            className="text-gray-100 uppercase font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ease-in-out  hover:bg-slate-800"
          >
            {t("home.users")}
          </Link>
        )}
        {!loggedInUser && (
          <Link
            href="/login"
            className="text-gray-100 uppercase font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ease-in-out  hover:bg-slate-800"
          >
            {t("home.login")}
          </Link>
        )}
        {!loggedInUser && (
          <Link
            href="/register"
            className="text-gray-100 uppercase font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ease-in-out  hover:bg-slate-800"
          >
            {t("home.register")}
          </Link>
        )}
        {loggedInUser && (
          <Link
            href="/login"
            className="text-gray-100 uppercase font-medium tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ease-in-out  hover:bg-slate-800"
            onClick={handleClick}
          >
            {t("home.logout")}
          </Link>
        )}
        {loggedInUser && (
          <p className="text-gray-100 font-medium tracking-wide px-2 py-2">
            {t("home.welcome")} {loggedInUser.username}
          </p>
        )}

        <Language></Language>
      </nav>
    </header>
  );
};

export default Header;
