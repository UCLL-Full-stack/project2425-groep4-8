import { Ingredient } from './Ingredient';
import { RecipeIngredient } from './RecipeIngredient';
import { Review } from './Review';
import { User } from './User';
import {
    RecipeIngredient as RecipeIngredientPrisma,
    Recipe as RecipePrisma,
    Review as ReviewPrisma,
    User as UserPrisma,
} from '@prisma/client';

export class Recipe {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly reviews?: Review[];
    // readonly recipeIngredients?: RecipeIngredient[];

    constructor(data: {
        id?: number;
        name: string;
        description: string;
        reviews?: Review[];
        // recipeIngredients?: RecipeIngredient[];
    }) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.reviews = data.reviews;
        // this.recipeIngredients = data.recipeIngredients;
    }

    equals(recipe: Recipe): boolean {
        return this.name === recipe.name
    }

    static from = ({
        id,
        name,
        description,
        // recipeIngredients,
        reviews,
    }: RecipePrisma & {
        // recipeIngredients: RecipeIngredientPrisma[];
        reviews: ReviewPrisma[];
    }): Recipe => {
        return new Recipe({
            id,
            name,
            description,
            // recipeIngredients: recipeIngredients.map((ri) => RecipeIngredient.from(ri)),
            reviews: reviews.map((review) => Review.from(review)),
        });
    };
}
