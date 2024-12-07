import IngredientDb from '../repository/Ingredient.db';
import { Ingredient } from '../model/Ingredient';

const getAllIngredients = async (): Promise<Ingredient[]> => {
    return IngredientDb.getAllIngredients();
};

const getIngredientById = async (id: number): Promise<Ingredient | null> => {
    return IngredientDb.getIngredientById(id);
};

const createIngredient = async (ingredient: Ingredient): Promise<Ingredient> => {
    return IngredientDb.createIngredient(ingredient);
};

export default {
    getAllIngredients,
    getIngredientById,
    createIngredient,
};
