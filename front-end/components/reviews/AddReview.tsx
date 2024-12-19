import RecipeService from "@/services/RecipeService";
import UserService from "@/services/UserService";
import IngredientService from "@/services/IngredientService"; // Service om ingrediënten op te halen
import { Ingredient, Recipe, StatusMessage } from "@/types";
import { useTranslation } from "next-i18next";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ReviewService from "@/services/ReviewService";

const AddReview: React.FC = () => {
  const [text, setText] = useState("");
  const [score, setScore] = useState("");
  const [textError, setTextError] = useState<string | null>(null);
  const [scoreError, setScoreError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await RecipeService.getAllRecipes();
        if (response.status === 200) {
          const data = await response.json();
          setRecipes(data);
        } else {
          throw new Error("Fout bij het ophalen van recepten.");
        }
      } catch (error: any) {
        setStatusMessages([
          {
            message:
              error.message ||
              "Er is een fout opgetreden bij het ophalen van recepten.",
            type: "error",
          },
        ]);
      }
    };

    fetchRecipes();
  }, []);

  const clearErrors = () => {
    setTextError(null);
    setScoreError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!text.trim()) {
      setTextError("text is required");
      result = false;
    }

    if (Number(score) < 0 || Number(score) > 5 || score.length === 0) {
      setScoreError("score must be between 0 and 5");
      result = false;
    }

    if (selectedRecipe === null || selectedRecipe === 0) {
      setStatusMessages([
        {
          message: "Je moet één recipe selecteren.",
          type: "error",
        },
      ]);
      result = false;
    }

    return result;
  };

  const handleRecipeSelection = (recipeId: number) => {
    setSelectedRecipe((prev) => (prev === recipeId ? 0 : recipeId));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    try {
      const loggedInUser = JSON.parse(
        sessionStorage.getItem("loggedInUser") || "{}"
      );
      const usertext = loggedInUser?.username;

      if (!usertext) {
        throw new Error("Geen gebruiker ingelogd.");
      }

      const userResponse = await UserService.getUserByUsername(usertext);
      if (userResponse.status !== 200) {
        throw new Error("Gebruiker niet gevonden.");
      }

      const user = await userResponse.json();
      const userId = user.id;

      const data = {
        text,
        score: Number(score),
      };

      const reviewResponse = await ReviewService.AddReview(
        userId,
        selectedRecipe,
        data
      );
      if (reviewResponse.status === 201) {
        setStatusMessages([
          {
            message: `Review succesvol toegevoegd!`,
            type: "success",
          },
        ]);
        setTimeout(() => {
          router.push("/reviews");
        }, 3000);
      } else {
        throw new Error("Fout bij het toevoegen van het review.");
      }
    } catch (error: any) {
      setStatusMessages([
        {
          message: error.message || "Er is een fout opgetreden.",
          type: "error",
        },
      ]);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <h3 className="px-0">Add review</h3>
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="textInput" className="block mb-2 text-sm font-medium">
          Text
        </label>
        <input
          id="textInput"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
        />
        {textError && <div className="text-red-800">{textError}</div>}

        <label
          htmlFor="scoreInput"
          className="block mb-2 text-sm font-medium mt-2"
        >
          Score
        </label>
        <input
          id="scoreInput"
          type="text"
          value={score}
          onChange={(event) => setScore(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
        />
        {scoreError && <div className="text-red-800">{scoreError}</div>}

        <div className="mt-4">
          <h4>Select Recipes</h4>
          <div className="mt-2">
            <ul>
              {recipes.map((recipe) => (
                <li key={recipe.id}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() =>
                        recipe.id !== undefined &&
                        handleRecipeSelection(recipe.id)
                      }
                      checked={
                        recipe.id !== undefined && selectedRecipe === recipe.id
                      }
                    />
                    {recipe.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
          type="submit"
        >
          Add review
        </button>
      </form>
    </>
  );
};

export default AddReview;
