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

const deleteReview = async (id: number): Promise<boolean> => {
    const review = await ReviewDb.getReviewById(id);
    if (!review) {
        return false;
    }

    await ReviewDb.deleteReview(id);
    return true;
};

const getAllReviewsWithUsers = async (): Promise<Review[]> => {
    return ReviewDb.getAllReviewsWithUsers();
};

const getReviewsByUserId = async (userId: number): Promise<Review[]> => {
    return ReviewDb.getReviewsByUserId(userId);
};

export default {
    getAllReviews,
    getReviewById,
    createReview,
    deleteReview,
    getReviewsByUserId,
    getAllReviewsWithUsers,
};
