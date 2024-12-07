import React, { useEffect, useState } from "react";
import ReviewOverviewTable from "../../components/reviews/ReviewOverviewTable";
import ReviewService from "../../services/ReviewService";
import { Review } from "../../types";
import Head from "next/head";
import Header from "@/components/header";

const Reviews: React.FC = () => {
  const [reviews, setReview] = useState<Review[]>([]);

  const getReviews = async () => {
    try {
      const response = await ReviewService.getAllReviews();
      const data = await response.json();
      setReview(data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <>
      <Head>
        <title>Reviews</title>
      </Head>
      <Header />
      <main className="min-h-screen bg-gradient-to-r px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Reviews</h1>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Reviews Overview
            </h2>
            {reviews.length > 0 ? (
              <ReviewOverviewTable reviews={reviews} />
            ) : (
              <p className="text-center text-gray-300">No reviews available</p>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Reviews;
