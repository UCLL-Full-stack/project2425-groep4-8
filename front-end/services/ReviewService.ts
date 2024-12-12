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

const ReviewService = {
  getAllReviews,
};

export default ReviewService;
