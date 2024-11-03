import { RecipeIngredient } from "@prisma/client";

type Ingredient = {
    id?: number;
    name: string;
    category: string;
};

type IngredientInput = {
    name: string;
    category: string;
};

type Recipe = {
    id?: number;
    name: string;
    description: string;
    ingredients: RecipeIngredient[];
    creator: User; 
    reviews: Review[]; 
};

type RecipeInput = {
    name: string;
    description: string;
    ingredients: IngredientInput[];
    creator: User;
    reviews: Review[];
};

type Review = {
    id?: number;
    writer: User;
    text: string;
    score: number;
    recipe: Recipe;
};

type ReviewInput = {
    writer: User;
    text: string;
    score: number;
    recipe: Recipe;
};

type User = {
    id?: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    recipes?: Recipe[];
    reviews?: Review[];
    // Geen wachtwoord hier voor security reasons
};

type UserInput = {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

// Exporting all types
export {
    User,
    UserInput,
    Recipe,
    RecipeInput,
    Review,
    ReviewInput,
    Ingredient,
    IngredientInput
};
