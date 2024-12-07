import RecipeDb from '../repository/Recipe.db';
import { Recipe } from '../model/Recipe';
import { error } from 'console';

const getAllRecipes = async (): Promise<Recipe[]> => {
    return RecipeDb.getAllRecipes();
};

const getRecipeById = async (id: number): Promise<Recipe | null> => {
    if (id === undefined) {
        throw new Error(`Recipe ${id} not found`);
    }
    return RecipeDb.getRecipeById(id);
};

const createRecipe = async (recipe: Recipe, userId: number): Promise<Recipe> => {
    return RecipeDb.createRecipe(recipe, userId);
};

export default {
    getAllRecipes,
    getRecipeById,
    createRecipe,
};
