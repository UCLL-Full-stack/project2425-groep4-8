import { RecipeIngredient } from './RecipeIngredient';
import {
    RecipeIngredient as RecipeIngredientPrisma,
    Recipe as RecipePrisma,
    Review as ReviewPrisma,
    User as UserPrisma,
    Ingredient as IngredientPrisma,
} from '@prisma/client';

export class Ingredient {
    readonly id?: number;
    readonly name: string;
    readonly category: string;
    // readonly recipeIngredients?: RecipeIngredient[];

    constructor(ingredient: {
        id?: number;
        name: string;
        category: string;
        // recipeIngredients?: RecipeIngredient[];
    }) {
        this.validate(ingredient);
        this.id = ingredient.id;
        this.name = ingredient.name;
        this.category = ingredient.category;
        // this.recipeIngredients = ingredient.recipeIngredients;
    }

    validate(ingredient: { id?: number; name: string; category: string }) {
        if (!ingredient.name) {
            throw new Error('Ingredient name is required');
        }

        if (!ingredient.category) {
            throw new Error('Ingredient category is required');
        }
    }

    equals(ingredient: Ingredient): boolean {
        return this.name === ingredient.name && this.category === ingredient.category;
    }

    static from = ({
        id,
        name,
        category,
    }: // recipeIngredients,
    IngredientPrisma & {
        // recipeIngredients?: RecipeIngredientPrisma[];
    }): Ingredient => {
        return new Ingredient({
            id,
            name,
            category,
            // recipeIngredients: recipeIngredients.map((ri) => RecipeIngredient.from(ri)),
        });
    };
}
