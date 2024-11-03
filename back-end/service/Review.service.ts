import ReviewDb from '../repository/Review.db';
import { Review } from '../model/Review';

const getAllReviews = (): Review[] => {
    return ReviewDb.getAllReviews();
};

const getReviewById = (id: number): Review => {
    return ReviewDb.getReviewById(id);
};

const createReview = (review: Review): Review => {
    return ReviewDb.createReview(review);
};

export default {
    getAllReviews,
    getReviewById,
    createReview,
};
