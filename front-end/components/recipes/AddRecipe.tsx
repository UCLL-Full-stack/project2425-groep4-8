import RecipeService from "@/services/RecipeService";
import UserService from "@/services/UserService";
import IngredientService from "@/services/IngredientService"; // Service om ingrediënten op te halen
import { Ingredient, StatusMessage } from "@/types";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const AddRecipe: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await IngredientService.getAllIngredients();
        if (response.status === 200) {
          const data = await response.json();
          setIngredients(data);
        } else {
          throw new Error("Fout bij het ophalen van ingrediënten.");
        }
      } catch (error: any) {
        setStatusMessages([
          {
            message:
              error.message ||
              "Er is een fout opgetreden bij het ophalen van ingrediënten.",
            type: "error",
          },
        ]);
      }
    };

    fetchIngredients();
  }, []);

  const clearErrors = () => {
    setNameError(null);
    setDescriptionError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!name.trim()) {
      setNameError("Name is required");
      result = false;
    }

    if (!description.trim()) {
      setDescriptionError("Description is required");
      result = false;
    }

    if (selectedIngredients.length === 0) {
      setStatusMessages([
        {
          message: "Je moet minstens één ingrediënt selecteren.",
          type: "error",
        },
      ]);
      result = false;
    }

    return result;
  };

  const handleIngredientSelection = (ingredientId: number) => {
    setSelectedIngredients((prev) => {
      if (prev.includes(ingredientId)) {
        return prev.filter((id) => id !== ingredientId);
      }
      return [...prev, ingredientId];
    });
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
      const username = loggedInUser?.username;

      if (!username) {
        throw new Error("Geen gebruiker ingelogd.");
      }

      const userResponse = await UserService.getUserByUsername(username);
      if (userResponse.status !== 200) {
        throw new Error("Gebruiker niet gevonden.");
      }

      const user = await userResponse.json();
      const userId = user.id;

      const selectedIngredientObjects = ingredients.filter(
        (ingredient) =>
          ingredient.id !== undefined &&
          selectedIngredients.includes(ingredient.id)
      );

      const recipeData = {
        name,
        description,
        ingredients: selectedIngredientObjects,
      };

      console.log("recipe " + JSON.stringify(recipeData));

      const recipeResponse = await RecipeService.AddRecipe(userId, recipeData);
      if (recipeResponse.status === 201) {
        setStatusMessages([
          {
            message: `Recept succesvol toegevoegd!`,
            type: "success",
          },
        ]);
        setTimeout(() => {
          router.push("/recipes");
        }, 3000);
      } else {
        throw new Error("Fout bij het toevoegen van het recept.");
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
      <h3 className="px-0">{t("addRecipe.title")}</h3>
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
        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
          {t("addRecipe.nameLabel")}
        </label>
        <input
          id="nameInput"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
        />
        {nameError && <div className="text-red-800">{nameError}</div>}

        <label
          htmlFor="descriptionInput"
          className="block mb-2 text-sm font-medium mt-2"
        >
          {t("addRecipe.descriptionLabel")}
        </label>
        <input
          id="descriptionInput"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
        />
        {descriptionError && (
          <div className="text-red-800">{descriptionError}</div>
        )}

        <div className="mt-4">
          <h4> {t("addRecipe.ingredientsLabel")}</h4>
          <div className="mt-2">
            <ul>
              {ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() =>
                        ingredient.id !== undefined &&
                        handleIngredientSelection(ingredient.id)
                      }
                      checked={
                        ingredient.id !== undefined &&
                        selectedIngredients.includes(ingredient.id)
                      }
                    />
                    {ingredient.name} ({ingredient.category})
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
          {t("addRecipe.submitButton")}
        </button>
      </form>
    </>
  );
};

export default AddRecipe;
