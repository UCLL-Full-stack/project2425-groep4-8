// import { Recipe } from './Recipe';
// import { Ingredient } from './Ingredient';
// import {
//     RecipeIngredient as RecipeIngredientPrisma,
//     Recipe as RecipePrisma,
//     Review as ReviewPrisma,
//     User as UserPrisma,
//     Ingredient as IngredientPrisma,
// } from '@prisma/client';

// export class RecipeIngredient {
//     readonly id?: number;
//     readonly amount: number;
//     readonly measurementType: string;
//     readonly ingredients: Ingredient[];
//     // readonly recipe: Recipe;

//     constructor(data: {
//         id?: number;
//         amount: number;
//         measurementType: string;
//         ingredients: Ingredient[];
//         // recipe: Recipe;
//     }) {
//         this.id = data.id;
//         this.amount = data.amount;
//         this.measurementType = data.measurementType;
//         this.ingredients = data.ingredients;
//         //     this.recipe = data.recipe;
//     }

//     static from = ({
//         id,
//         amount,
//         measurementType,
//         ingredients,
//     }: // recipe,
//     RecipeIngredientPrisma & {
//         ingredients: IngredientPrisma[];
//         // recipe: RecipePrisma & {
//         //     reviews: ReviewPrisma[];
//         // };
//     }): RecipeIngredient => {
//         return new RecipeIngredient({
//             id,
//             amount,
//             measurementType,
//             ingredients: ingredients.map((ingredient) => Ingredient.from(ingredient)),
//             // recipe: Recipe.from(recipe),
//         });
//     };
// }
