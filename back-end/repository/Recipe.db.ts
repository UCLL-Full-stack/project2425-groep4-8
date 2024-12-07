import database from '../util/database';
import { Recipe } from '../model/Recipe';
import { User } from '../model/User';
import { Review } from '../model/Review';

const getAllRecipes = async (): Promise<Recipe[]> => {
    const recipePrisma = await database.recipe.findMany({
        include: {
            reviews: true,
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
        },
    });

    if (!recipePrisma) {
        return null;
    }

    return Recipe.from(recipePrisma);
};

const createRecipe = async ({ name, description }: Recipe, userId: number): Promise<Recipe> => {
    try {
        const recipePrisma = await database.recipe.create({
            data: {
                name,
                description,
                user: { connect: { id: userId } },
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

export default {
    getAllRecipes,
    getRecipeById,
    createRecipe,
};
