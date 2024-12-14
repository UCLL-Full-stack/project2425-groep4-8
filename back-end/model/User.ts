import { Recipe } from './Recipe';
import { Review } from './Review';
import { Role } from '../types';
import {
    User as UserPrisma,
    Recipe as RecipePrisma,
    Review as ReviewPrisma,
    Ingredient as IngredientPrisma,
} from '@prisma/client';

export class User {
    readonly id?: number;
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly recipes?: Recipe[];
    readonly reviews?: Review[];
    readonly role: Role;

    constructor(user: {
        id?: number;
        username: string;
        password: string;
        email: string;
        firstName: string;
        lastName: string;
        recipes?: Recipe[];
        reviews?: Review[];
        role: Role;
    }) {
        this.validate(user);
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.recipes = user.recipes;
        this.reviews = user.reviews;
        this.role = user.role;
    }

    private validate(user: {
        username: string;
        password: string;
        email: string;
        firstName: string;
        lastName: string;
    }) {
        if (!user.username) throw new Error('Username is required');
        if (user.username.length < 3)
            throw new Error('Username must be at least 3 characters long');

        if (!user.password) throw new Error('Password is required');

        if (!user.password?.trim()) {
            throw new Error('Password must be at least 3 characters long');
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!user.email) throw new Error('Email is required');
        if (!emailRegex.test(user.email)) throw new Error('Invalid email format');

        if (!user.firstName) throw new Error('First name is required');
        if (!user.lastName) throw new Error('Last name is required');
    }

    // static filterReviewsForRecipe(
    //     recipe: RecipePrisma & { reviews: ReviewPrisma[] },
    //     userId: number
    // ): Review[] {
    //     return recipe.reviews
    //         .filter((review) => review.userId === userId)
    //         .map((review) => new Review(review));
    // }

    equals(user: User): boolean {
        return this.username === user.username && this.email === user.email;
    }

    static from = (
        user: UserPrisma & {
            recipes: (RecipePrisma & { reviews?: ReviewPrisma[] } & {
                ingredients?: IngredientPrisma[];
            })[];
            reviews: ReviewPrisma[];
        }
    ): User => {
        return new User({
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role as Role,
            recipes: user.recipes.map((recipe) =>
                Recipe.from({
                    ...recipe,
                    ingredients: recipe.ingredients ?? [],
                    reviews: (recipe.reviews ?? []).map((review) => ({
                        id: review.id,
                        text: review.text,
                        score: review.score,
                        recipeId: review.recipeId,
                        userId: review.userId,
                    })),
                })
            ),
            reviews: user.reviews.map((review) => new Review(review)),
        });
    };
}
