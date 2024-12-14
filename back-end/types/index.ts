import { RecipeIngredient } from '@prisma/client';

type Role = 'admin' | 'chef' | 'user';

type IngredientInput = {
    id?: number;
    name: string;
    category: string;
};

type RecipeInput = {
    id?: number;
    name: string;
    description: string;
    ingredients: RecipeIngredient[];
    creator: UserInput;
    reviews: ReviewInput[];
};

type ReviewInput = {
    id?: number;
    writer: UserInput;
    text: string;
    score: number;
    recipe: RecipeInput;
};

type UserInput = {
    id?: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    recipes?: RecipeInput[];
    reviews?: ReviewInput[];
};

type AuthenticationRespone = {
    token: string;
    username: string;
    fullname: string;
    role: Role;
};

export { UserInput, RecipeInput, ReviewInput, IngredientInput, AuthenticationRespone, Role };
