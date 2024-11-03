const getAllIngredients = async () => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/ingredients",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`); // Log de foutstatus
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
