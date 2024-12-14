const getAuthToken = () => {
  const token = localStorage.getItem("token");
  console.log("Retrieved token:", token);
  return token;
};

const getAllRecipes = () => {
  const token = getAuthToken();

  return fetch(process.env.NEXT_PUBLIC_API_URL + "/recipes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const RecipeService = {
  getAllRecipes,
};

export default RecipeService;
