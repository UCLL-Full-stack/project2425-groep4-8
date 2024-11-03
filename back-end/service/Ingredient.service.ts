import IngredientDb from '../repository/Ingredient.db';
import { Ingredient } from '../model/Ingredient';

const getAllIngredients = (): Ingredient[] => {
    return IngredientDb.getAllIngredients();
};

const getIngredientById = (id: number): Ingredient => {
    return IngredientDb.getIngredientById(id);
};

const createIngredient = (ingredient: Ingredient): Ingredient => {
    return IngredientDb.createIngredient(ingredient);
};

export default {
    getAllIngredients,
    getIngredientById,
    createIngredient,
};
