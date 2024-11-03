const getAllRecipes = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/recipes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const RecipeService = {
  getAllRecipes,
};

export default RecipeService;
