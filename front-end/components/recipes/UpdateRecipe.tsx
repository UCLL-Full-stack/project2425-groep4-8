import React, { useState, useEffect } from "react";
import { Recipe } from "../../types";
import RecipeService from "../../services/RecipeService";
import UserService from "@/services/UserService";

type Props = {
  recipe: Recipe;
  onClose: () => void;
  onUpdate: () => void;
};

const UpdateRecipeForm: React.FC<Props> = ({ recipe, onClose, onUpdate }) => {
  const [name, setName] = useState(recipe.name);
  const [description, setDescription] = useState(recipe.description);
  const [ingredients, setIngredients] = useState(recipe.ingredients || []);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(
      sessionStorage.getItem("loggedInUser") || "{}"
    );
    if (loggedInUser?.username) {
      UserService.getUserByUsername(loggedInUser.username).then(
        (userResponse) => {
          if (userResponse.status === 200) {
            userResponse.json().then((user) => {
              setUserId(user.id);
            });
          } else {
            console.error("Failed to fetch user by username");
          }
        }
      );
    } else {
      console.error("No user is logged in");
    }
  }, []);

  const handleUpdate = async () => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    try {
      if (recipe.id === undefined) {
        throw new Error("Recipe ID is undefined");
      }

      await RecipeService.UpdateRecipe(userId, recipe.id, {
        name,
        description,
        ingredients,
      });

      onUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to update recipe", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Update Recipe</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="button"
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={!userId}
        >
          Update
        </button>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateRecipeForm;
