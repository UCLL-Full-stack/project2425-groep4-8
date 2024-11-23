import { User } from './User';
import { Recipe } from './Recipe';
import {
    RecipeIngredient as RecipeIngredientPrisma,
    Recipe as RecipePrisma,
    Review as ReviewPrisma,
    User as UserPrisma,
} from '@prisma/client';
export class Review {
    readonly id?: number;
    readonly writer: User;
    readonly text: string;
    readonly score: number;
    readonly recipe?: Recipe;

    constructor(review: {
        id?: number;
        writer: User;
        text: string;
        score: number;
        recipe?: Recipe;
    }) {
        this.validate(review);
        this.id = review.id;
        this.writer = review.writer;
        this.text = review.text;
        this.score = review.score;
        this.recipe = review.recipe;
    }

    validate(review: { id?: number; writer: User; text: string; score: number; recipe?: Recipe }) {
        if (!review.text) {
            throw new Error('Review text is required');
        }

        if (review.score < 1 || review.score > 5) {
            throw new Error('Score must be between 1 and 5');
        }
    }

    equals(review: Review): boolean {
        return (
            this.text === review.text &&
            this.score === review.score &&
            this.writer.equals(review.writer)
        );
    }

    static from = ({
        id,
        text,
        score,
        writer,
        recipe,
    }: ReviewPrisma & {
        writer: UserPrisma;
        recipe?: RecipePrisma;
    }): Review => {
        return new Review({
            id,
            text,
            score,
            writer: User.from(writer),
            recipe: recipe ? Recipe.from(recipe) : undefined,
        });
    };
}
