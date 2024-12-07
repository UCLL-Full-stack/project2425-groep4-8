import ReviewDb from '../repository/Review.db';
import { Review } from '../model/Review';

const getAllReviews = async (): Promise<Review[]> => {
    return ReviewDb.getAllReviews();
};

const getReviewById = async (id: number): Promise<Review | null> => {
    return ReviewDb.getReviewById(id);
};

const createReview = async (
    review: Review,
    userId: number,
    recipeId: number
): Promise<Review | null> => {
    return ReviewDb.createReview(review, userId, recipeId);
};

export default {
    getAllReviews,
    getReviewById,
    createReview,
};
