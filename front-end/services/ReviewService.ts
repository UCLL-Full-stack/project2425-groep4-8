const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

const getAllReviews = () => {
  const token = getAuthToken();

  return fetch(process.env.NEXT_PUBLIC_API_URL + "/reviews", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const AddReview = (
  userId: number,
  recipeId: number,
  data: { text: string; score: number }
) => {
  const token = getAuthToken();

  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reviews/${userId}/${recipeId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
        userId,
        recipeId,
      }),
    }
  );
};

const ReviewService = {
  getAllReviews,
  AddReview,
};

export default ReviewService;
