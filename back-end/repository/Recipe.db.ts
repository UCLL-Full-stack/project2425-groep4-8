import { Recipe } from '../model/Recipe';
import { User } from '../model/User';
import { Review } from '../model/Review';

// Sample in-memory array to hold recipes
const recipes: Recipe[] = [
    new Recipe({
        id: 1,
        name: 'Spaghetti Bolognese',
        description: 'A classic Italian dish with pasta and meat sauce.',
        recipeIngredients: [
            {
                amount: 200,
                measurementType: 'grams',
                ingredientId: 1,
                id: 0,
                recipeId: 0,
            },
        ],
        reviews: [
            new Review({
                id: 1,
                writer: new User({
                    id: 1,
                    username: 'sampleUser',
                    password: 'samplePassword',
                    email: 'sample@example.com',
                    firstName: 'Sample',
                    lastName: 'User',
                }),
                text: 'I love you, this is the best',
                score: 5,
            }),
            new Review({
                id: 1,
                writer: new User({
                    id: 1,
                    username: 'sampleUser',
                    password: 'samplePassword',
                    email: 'sample@example.com',
                    firstName: 'Sample',
                    lastName: 'User',
                }),
                text: 'Ew what is this',
                score: 2,
            }),
        ],
    }),
    new Recipe({
        id: 2,
        name: 'Chicken Curry',
        description: 'A flavorful Indian dish with chicken and spices.',
        recipeIngredients: [
            {
                amount: 300,
                measurementType: 'grams',
                ingredientId: 2,
                id: 1,
                recipeId: 1,
            },
            {
                amount: 100,
                measurementType: 'ml',
                ingredientId: 3,
                id: 2,
                recipeId: 1,
            },
        ],
        reviews: [],
    }),
];

const getAllRecipes = (): Recipe[] => {
    return recipes;
};

const getRecipeById = (id: number): Recipe => {
    const recipe = recipes.find((recipe) => recipe.id === id);
    if (!recipe) {
        throw new Error(`Recipe with id ${id} not found`);
    }
    return recipe;
};

const createRecipe = (recipe: Recipe): Recipe => {
    const newId = recipes.length > 0 ? (recipes[recipes.length - 1]?.id ?? 0) + 1 : 1;
    const newRecipe = new Recipe({
        id: newId,
        name: recipe.name,
        description: recipe.description,
        creator: recipe.creator, // Assume creator is passed in with the recipe
        recipeIngredients: recipe.recipeIngredients,
        reviews: recipe.reviews,
    });
    recipes.push(newRecipe);
    return newRecipe;
};

export default {
    getAllRecipes,
    getRecipeById,
    createRecipe,
};
