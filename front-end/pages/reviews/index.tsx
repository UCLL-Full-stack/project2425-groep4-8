import React, { useEffect, useState } from "react";
import ReviewOverviewTable from "../../components/reviews/ReviewOverviewTable";
import ReviewService from "../../services/ReviewService";
import { Review, User } from "../../types";
import Head from "next/head";
import Header from "@/components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

const Reviews: React.FC = () => {
  const [reviews, setReview] = useState<Review[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }

    console.log("user " + user);
  }, []);

  const getReviews = async () => {
    try {
      const response = await ReviewService.getAllReviews();
      const data = await response.json();
      console.log(data);
      setReview(data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };

  const deleteReview = async (id: number) => {
    try {
      await ReviewService.deleteReview(id);
      setReview((prevReviews) =>
        prevReviews.filter((review) => review.id !== id)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Reviews</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-r px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            {t("pages.review.reviews")}
          </h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {t("overview.reviews")}
            </h2>
            {loggedInUser ? (
              reviews.length > 0 ? (
                <>
                  <section className="flex justify-center">
                    <Link
                      href="/reviews/add"
                      className=" bg-slate-400 text-white tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ease-in-out  hover:bg-slate-800"
                    >
                      Add a review
                    </Link>
                  </section>
                  <ReviewOverviewTable
                    reviews={reviews}
                    onDelete={deleteReview}
                  />
                </>
              ) : (
                <p className="text-center text-gray-300">
                  {t("pages.review.not")}
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

export default Reviews;
