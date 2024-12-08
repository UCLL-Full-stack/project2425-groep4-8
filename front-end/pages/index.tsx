import Head from "next/head";
import Image from "next/image";
import Header from "@/components/header";
import Link from "next/link";

export default function Home() {
  const loggedInUser = sessionStorage.getItem("loggedInUser");

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
            Welkom bij TasteBuddy!
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Deel jouw favoriete recepten en ontdek nieuwe gerechten van andere
            kookliefhebbers.
          </p>
          {loggedInUser && (
            <Link
              href="/recipes"
              className="bg-gray-800 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out"
            >
              Ontdek Recepten
            </Link>
          )}
        </div>
      </main>
    </>
  );
}
