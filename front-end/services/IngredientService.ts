const getAuthToken = () => {
  const token = localStorage.getItem("token");
  console.log("Retrieved token:", token);
  return token;
};

const getAllIngredients = async () => {
  const token = getAuthToken();

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/ingredients",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};

const IngredientService = {
  getAllIngredients,
};

export default IngredientService;
