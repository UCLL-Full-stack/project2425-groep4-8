import { Ingredient } from './Ingredient';
import { Review } from './Review';
import { User } from './User';
import {
    Recipe as RecipePrisma,
    Review as ReviewPrisma,
    User as UserPrisma,
    Ingredient as IngredientPrisma,
} from '@prisma/client';

export class Recipe {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly reviews?: Review[];
    // readonly recipeIngredients?: RecipeIngredient[];
    readonly ingredients?: Ingredient[];

    constructor(data: {
        id?: number;
        name: string;
        description: string;
        reviews?: Review[];
        // recipeIngredients?: RecipeIngredient[];
        readonly ingredients?: Ingredient[];
    }) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.reviews = data.reviews;
        // this.recipeIngredients = data.recipeIngredients;
        this.ingredients = data.ingredients;
    }

    equals(recipe: Recipe): boolean {
        return this.id === recipe.id && this.name === recipe.name;
    }

    static from = ({
        id,
        name,
        description,
        // recipeIngredients,
        reviews,
        ingredients,
    }: RecipePrisma & {
        // recipeIngredients: RecipeIngredientPrisma[];
        ingredients: IngredientPrisma[];
        reviews: ReviewPrisma[];
    }): Recipe => {
        return new Recipe({
            id,
            name,
            description,
            // recipeIngredients: recipeIngredients.map((ri) => RecipeIngredient.from(ri)),
            reviews: reviews.map((review) => Review.from(review)),
            ingredients: ingredients.map((ingredient) => Ingredient.from(ingredient)),
        });
    };
}
