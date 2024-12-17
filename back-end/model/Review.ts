import { User } from './User';
import { Recipe } from './Recipe';
import { Recipe as RecipePrisma, Review as ReviewPrisma, User as UserPrisma } from '@prisma/client';
export class Review {
    readonly id?: number;
    readonly text: string;
    readonly score: number;

    constructor(review: { id?: number; text: string; score: number }) {
        this.validate(review);
        this.id = review.id;
        this.text = review.text;
        this.score = review.score;
    }

    validate(review: { id?: number; text: string; score: number }) {
        if (!review.text) {
            throw new Error('Review text is required');
        }

        if (review.score < 1 || review.score > 5) {
            throw new Error('Score must be between 1 and 5');
        }
    }

    equals(review: Review): boolean {
        return this.text === review.text && this.score === review.score;
    }

    static from = ({ id, text, score }: ReviewPrisma): Review => {
        return new Review({
            id,
            text,
            score,
        });
    };
}
