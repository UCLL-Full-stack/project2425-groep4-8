import { User } from './User';
import { Recipe } from './Recipe';

export class Review {
    readonly id?: number;
    readonly writer: User;
    readonly text: string;
    readonly score: number;
    readonly recipe?: Recipe;

    constructor(review: { id?: number, writer: User, text: string, score: number, recipe?: Recipe }) {
        this.validate(review);
        this.id = review.id;
        this.writer = review.writer;
        this.text = review.text;
        this.score = review.score;
        this.recipe = review.recipe;
    }

    validate(review: { id?: number, writer: User, text: string, score: number, recipe?: Recipe }) {
        if (!review.text) {
            throw new Error("Review text is required");
        }

        if (review.score < 1 || review.score > 5) {
            throw new Error("Score must be between 1 and 5");
        }
    }

    equals(review: Review): boolean {
        return this.text === review.text && this.score === review.score && this.writer.equals(review.writer) ;
    }

    static from(reviewPrisma: any): Review {
        return new Review({
            id: reviewPrisma.id,
            writer: reviewPrisma.writer,
            text: reviewPrisma.text,
            score: reviewPrisma.score,
            recipe: reviewPrisma.recipe,
        });
    }
}

export default { Review };