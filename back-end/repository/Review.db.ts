//

import database from '../util/database';
import { Review } from '../model/Review';
import { User } from '../model/User';
import { Recipe } from '../model/Recipe';

// Sample in-memory array to hold reviews
const reviews: Review[] = [
    new Review({
        id: 1,
        writer: new User({
            id: 1,
            username: 'sampleUser',
            password: 'samplePassword',
            email: 'sample@example.com',
            firstName: 'Sample',
            lastName: 'User',
        }),
        text: 'I love you, this is the best',
        score: 5,
        recipe: new Recipe({
            id: 1,
            name: 'Sample Recipe',
            description: 'Sample description',
            recipeIngredients: [
                {
                    id: 1,
                    amount: 100,
                    measurementType: 'grams',
                    recipeId: 1,
                    ingredientId: 1,
                },
            ],
            creator: new User({
                id: 2,
                username: 'creatorUser',
                password: 'creatorPassword',
                email: 'creator@example.com',
                firstName: 'Creator',
                lastName: 'User',
            }),
            reviews: [],
        }),
    }),
];

const getAllReviews = (): Review[] => {
    return reviews;
};

const getReviewById = (id: number): Review => {
    const review = reviews.find((review) => review.id === id);
    if (!review) {
        throw new Error(`Review with id ${id} not found`);
    }
    return review;
};

const createReview = (review: Review): Review => {
    const newId = reviews.length > 0 ? (reviews[reviews.length - 1]?.id ?? 0) + 1 : 1;
    const newReview = new Review({
        id: newId,
        text: review.text,
        score: review.score,
        writer: review.writer,
        recipe: review.recipe,
    });
    reviews.push(newReview);
    return newReview;
};

export default {
    getAllReviews,
    getReviewById,
    createReview,
};
