import { RecipeIngredient } from '@prisma/client';
import { User } from './User';
import { Review } from './Review';

export class Recipe {
    id?: number;
    name: string;
    description: string;
    recipeIngredients: RecipeIngredient[];
    creator?: User;
    reviews?: Review[];

    constructor(data: {
        id?: number;
        name: string;
        description: string;
        recipeIngredients: RecipeIngredient[];
        creator?: User;
        reviews?: Review[];
    }) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.recipeIngredients = data.recipeIngredients || [];
        this.creator = data.creator;
        this.reviews = data.reviews || [];
    }

    validate() {
        if (!this.name) {
            throw new Error('Recipe name is required');
        }
        if (this.name.length < 3) {
            throw new Error('Recipe name needs to be at least 3 characters long');
        }
        if (!this.description) {
            throw new Error('Description is required');
        }
        this.recipeIngredients.forEach((ingredient) => {
            if (!ingredient.amount) {
                throw new Error('Ingredient amount is required');
            }
            if (!ingredient.measurementType) {
                throw new Error('Ingredient measurement type is required');
            }
        });
    }

    equals(recipe: Recipe): boolean {
        return this.name === recipe.name && this.description === recipe.description;
    }

    static from = (recipePrisma: any): Recipe => {
        // Temporarily set type to `any` for debugging
        return new Recipe({
            id: recipePrisma.id,
            name: recipePrisma.name,
            description: recipePrisma.description,
            recipeIngredients: recipePrisma.ingredients, // Adjust to correct field
            creator: recipePrisma.creator,
            reviews: recipePrisma.reviews,
        });
    };
}
