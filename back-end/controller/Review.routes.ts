import ReviewService from '../service/Review.service';
import { Review } from '../model/Review';
import express, { NextFunction, Request, Response } from 'express';

const reviewRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         content:
 *           type: string
 *           description: The content of the review.
 *         rating:
 *           type: integer
 *           description: The rating given in the review (1-5).
 *         userId:
 *           type: integer
 *           description: The ID of the user who wrote the review.
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Internal server error
 */
reviewRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await ReviewService.getAllReviews();
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the review to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */
reviewRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = await ReviewService.getReviewById(Number(req.params.id));
        if (!review) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /reviews/{userId}/{recipeId}:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Create a new review for a specific user and recipe
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user creating the review
 *         schema:
 *           type: integer
 *       - in: path
 *         name: recipeId
 *         required: true
 *         description: The ID of the recipe being reviewed
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "This recipe was amazing!"
 *               score:
 *                 type: integer
 *                 example: 5
 *             required:
 *               - text
 *               - score
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User or Recipe not found
 *       500:
 *         description: Internal server error
 */
reviewRouter.post('/:userId/:recipeId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = req.body as Review;
        const userId = parseInt(req.params.userId);
        const recipeId = parseInt(req.params.recipeId);
        console.log(userId, recipeId);
        const newReview = await ReviewService.createReview(review, userId, recipeId);
        res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
});

export default reviewRouter;
