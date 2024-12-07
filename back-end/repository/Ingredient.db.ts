import { Ingredient } from '../model/Ingredient';
import database from '../util/database';

const getAllIngredients = async (): Promise<Ingredient[]> => {
    const ingredientPrisma = await database.ingredient.findMany();

    if (!ingredientPrisma || ingredientPrisma.length === 0) {
        return [];
    }
    return ingredientPrisma.map((ingredient) => Ingredient.from(ingredient));
};

const getIngredientById = async (id: number): Promise<Ingredient | null> => {
    const ingredientPrisma = await database.ingredient.findUnique({
        where: {
            id: id,
        },
    });

    if (!ingredientPrisma) {
        return null;
    }

    return Ingredient.from(ingredientPrisma);
};

const createIngredient = async (ingredient: Ingredient): Promise<Ingredient> => {
    const ingredientPrisma = await database.ingredient.create({
        data: {
            name: ingredient.name,
            category: ingredient.category,
        },
    });

    return Ingredient.from(ingredientPrisma);
};

export default {
    getAllIngredients,
    getIngredientById,
    createIngredient,
};
