import RecipeDb from '../repository/Recipe.db';
import { Recipe } from '../model/Recipe';

const getAllRecipes = (): Recipe[] => {
    return RecipeDb.getAllRecipes();
};

const getRecipeById = (id: number): Recipe => {
    return RecipeDb.getRecipeById(id);
};

const createRecipe = (recipe: Recipe): Recipe => {
    return RecipeDb.createRecipe(recipe);
};

export default {
    getAllRecipes,
    getRecipeById,
    createRecipe,
};
