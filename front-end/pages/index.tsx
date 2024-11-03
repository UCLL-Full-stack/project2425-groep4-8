import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header></Header>
      <Head>
        <title>TasteBuddy</title>
        <meta
          name="description"
          content="Een platform om recepten te delen en nieuwe gerechten te ontdekken."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h1>Welkom bij TasteBuddy!</h1>
        <p>
          Deel jouw favoriete recepten en ontdek nieuwe gerechten van andere
          kookliefhebbers.
        </p>
      </main>
    </>
  );
}
