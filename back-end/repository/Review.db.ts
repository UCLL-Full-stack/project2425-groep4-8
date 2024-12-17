import database from '../util/database';
import { Review } from '../model/Review';
import { connect } from 'http2';

const getAllReviews = async (): Promise<Review[]> => {
    const reviewPrisma = await database.review.findMany({
        include: {
            recipe: true,
            user: true,
        },
    });

    if (!reviewPrisma || reviewPrisma.length === 0) {
        return [];
    }

    return reviewPrisma.map((reviewPrisma) => Review.from(reviewPrisma));
};

const getReviewById = async (id: number): Promise<Review | null> => {
    const reviewPrisma = await database.review.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
            recipe: true,
        },
    });

    if (!reviewPrisma) {
        return null;
    }

    return Review.from(reviewPrisma);
};

const createReview = async (review: Review, userId: number, recipeId: number): Promise<Review> => {
    const reviewPrisma = await database.review.create({
        data: {
            text: review.text,
            score: review.score,
            user: { connect: { id: userId } },
            recipe: { connect: { id: recipeId } },
        },
        include: {
            recipe: true,
            user: true,
        },
    });

    return Review.from(reviewPrisma);
};

const deleteReview = async (id: number): Promise<void> => {
    try {
        await database.review.delete({
            where: { id: id },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Error in database file at deleteReview');
    }
};

export default {
    getAllReviews,
    getReviewById,
    createReview,
    deleteReview,
};
