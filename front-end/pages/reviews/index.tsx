import Header from "../../components/header";
import ReviewOverviewTable from "../../components/reviews/ReviewOverviewTable";
import ReviewService from "../../services/ReviewService";
import { Review } from "../../types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Reviews: React.FC = () => {
  const [reviews, setReview] = useState<Array<Review>>([]);

  const getReviews = async () => {
    const response = await ReviewService.getAllReviews();
    const data = await response.json();
    setReview(data);
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
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Reviews</h1>
        <section>
          <h2>Reviews overview</h2>
        </section>
        {reviews.length > 0 ? (
          <ReviewOverviewTable reviews={reviews} />
        ) : (
          <p>No Reviews available</p>
        )}
      </main>
    </>
  );
};
export default Reviews;
