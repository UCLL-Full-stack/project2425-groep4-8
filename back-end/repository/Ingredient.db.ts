// import { Ingredient } from "../model/Ingredient";
// import database from "../util/database";

// const getAllIngredients = async (): Promise<Ingredient[]> => {
//     const ingredientPrisma = await database.ingredient.findMany();

//     if (!ingredientPrisma || ingredientPrisma.length === 0) {
//         return [];
//     }

//     // here we use prisma because we are getting the data from the database and need to transform it into the layout of our model
//     return ingredientPrisma.map((ingredientPrisma) => Ingredient.from(ingredientPrisma));
// };

// const getIngredientById = async (id: number): Promise<Ingredient | null> => {
//     const ingredientPrisma = await database.ingredient.findUnique({
//         where: {
//             id: id,
//         },
//     });

//     if (!ingredientPrisma) {
//         return null;
//     }

//     return Ingredient.from(ingredientPrisma);
// };

// const createIngredient = async (ingredient: Ingredient): Promise<Ingredient> => {
//     const ingredientPrisma = await database.ingredient.create({
//         data: {
//             name: ingredient.name,
//             category: ingredient.category,
//         },
//     });

//     return Ingredient.from(ingredientPrisma);
// };

// export default {
//     getAllIngredients,
//     getIngredientById,
//     createIngredient,
// };

import { Ingredient } from '../model/Ingredient';

const ingredients = [
    new Ingredient({
        id: 1,
        name: 'Carrot',
        category: 'Yummy',
    }),
];

const getAllIngredients = (): Ingredient[] => ingredients;

const getIngredientById = (id: number): Ingredient => {
    const ingredient = ingredients.find((ingredient) => ingredient.id === id);
    if (!ingredient) {
        throw new Error(`Ingredient with id ${id} not found`);
    }
    return ingredient;
};

const createIngredient = (ingredient: Ingredient): Ingredient => {
    const newId = ingredients.length > 0 ? (ingredients[ingredients.length - 1]?.id ?? 0) + 1 : 1;
    const newIngredient = new Ingredient({
        id: newId,
        name: ingredient.name,
        category: ingredient.category,
    });
    ingredients.push(newIngredient);
    return newIngredient;
};

export default {
    getAllIngredients,
    getIngredientById,
    createIngredient,
};
