import React, { useEffect, useState } from "react";
import ReviewOverviewTable from "../../components/reviews/ReviewOverviewTable";
import ReviewService from "../../services/ReviewService";
import UserService from "../../services/UserService";
import { Review, User } from "../../types";
import Head from "next/head";
import Header from "@/components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const getReviews = async () => {
    try {
      const response = await ReviewService.getAllReviews();
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const filterReviews = () => {
    if (loggedInUser) {
      const enrichedReviews = reviews
        .map((review) => {
          const reviewOwner = users.find((user) =>
            user.reviews?.some((userReview) => userReview.id === review.id)
          );
          return reviewOwner ? { ...review, user: reviewOwner } : null;
        })
        .filter((review) => review !== null) as Review[];

      console.log(enrichedReviews);

      if (loggedInUser) {
        if (loggedInUser.role !== "user") {
          setFilteredReviews(enrichedReviews);
        } else if (loggedInUser.role === "user") {
          const userReviews = enrichedReviews.filter(
            (review) => review.user?.username === loggedInUser.username
          );

          console.log(userReviews);
          setFilteredReviews(userReviews);
        }
      }
    }
  };

  const deleteReview = async (id: number) => {
    try {
      await ReviewService.deleteReview(id);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== id)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  useEffect(() => {
    getReviews();
    getUsers();
  }, []);

  useEffect(() => {
    filterReviews();
  }, [loggedInUser, reviews, users]);

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
              <>
                <section className="flex justify-center mb-4">
                  <Link
                    href="/reviews/add"
                    className="bg-slate-400 text-white tracking-wide px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-slate-800"
                  >
                    Add a review
                  </Link>
                </section>

                {filteredReviews.length > 0 ? (
                  <ReviewOverviewTable
                    reviews={filteredReviews}
                    onDelete={deleteReview}
                  />
                ) : (
                  <p className="text-center text-gray-300">
                    {t("pages.review.not")}
                  </p>
                )}
              </>
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
