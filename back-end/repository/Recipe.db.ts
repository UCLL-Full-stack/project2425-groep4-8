import database from '../util/database';
import { Recipe } from '../model/Recipe';
import { User } from '../model/User';
import { Review } from '../model/Review';
import { Ingredient } from '../model/Ingredient';

const getAllRecipes = async (): Promise<Recipe[]> => {
    const recipePrisma = await database.recipe.findMany({
        include: {
            reviews: true,
            ingredients: true,
        },
    });

    if (!recipePrisma || recipePrisma.length === 0) {
        return [];
    }

    return recipePrisma.map((recipePrisma) => Recipe.from(recipePrisma));
};

const getRecipeById = async (id: number): Promise<Recipe | null> => {
    const recipePrisma = await database.recipe.findUnique({
        where: {
            id: id,
        },
        include: {
            reviews: true,
            ingredients: true,
        },
    });

    if (!recipePrisma) {
        return null;
    }

    return Recipe.from(recipePrisma);
};

const createRecipe = async (
    { name, description, ingredients }: Recipe,
    userId: number
): Promise<Recipe> => {
    try {
        const recipePrisma = await database.recipe.create({
            data: {
                name,
                description,
                user: { connect: { id: userId } },
                ingredients: {
                    connect: ingredients?.map((ingredient) => ({ id: ingredient.id })),
                },
            },
            include: {
                ingredients: true,
                reviews: true,
                user: true,
            },
        });

        return Recipe.from(recipePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateRecipeById = async (id: number, recipeData: Recipe): Promise<Recipe> => {
    try {
        const updatedRecipe = await database.recipe.update({
            where: { id },
            data: {
                name: recipeData.name,
                description: recipeData.description,
                ingredients: recipeData.ingredients
                    ? {
                          connect: recipeData.ingredients.map((ingredient) => ({
                              id: ingredient.id,
                          })),
                      }
                    : undefined,
            },
            include: { ingredients: true, user: true, reviews: true },
        });

        return Recipe.from(updatedRecipe);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipeById,
};
