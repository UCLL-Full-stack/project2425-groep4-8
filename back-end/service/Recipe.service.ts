import RecipeDb from '../repository/Recipe.db';
import { Recipe } from '../model/Recipe';
import { error } from 'console';
import { Role } from '../types';
import UserDb from '../repository/User.db';

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

const updateRecipeByIdWithRole = async (
    id: number,
    recipeData: Recipe,
    role: Role,
    userId: number
): Promise<Recipe> => {
    const user = await UserDb.getUserById(userId);
    const recipe = await RecipeDb.getRecipeById(id);

    if (!recipe) {
        throw new Error('Recipe not found');
    }

    if (user?.role !== 'chef') {
        throw new Error('Access denied');
    }

    return await RecipeDb.updateRecipeById(id, recipeData);
};

export default {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipeByIdWithRole,
};
