import IngredientService from '../service/Ingredient.service';
import { Ingredient } from '../model/Ingredient';
import express, { NextFunction, Request, Response } from 'express';

const ingredientRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Ingredient:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The unique identifier for the ingredient.
 *         name:
 *           type: string
 *           description: The name of the ingredient.
 *         category:
 *           type: string
 *           description: The category of the ingredient (e.g., dairy, vegetable, spice).
 */

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Get all ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: List of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 *       500:
 *         description: Internal server error
 */
ingredientRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ingredients = await IngredientService.getAllIngredients();
        res.status(200).json(ingredients);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /ingredients/{id}:
 *   get:
 *     summary: Get an ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the ingredient to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ingredient found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingredient not found
 *       500:
 *         description: Internal server error
 */
ingredientRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ingredient = await IngredientService.getIngredientById(Number(req.params.id));
        if (!ingredient) {
            res.status(404).json({ message: 'Ingredient not found' });
            return;
        }
        res.status(200).json(ingredient);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /ingredients:
 *   post:
 *     summary: Create a new ingredient
 *     tags: [Ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tomato"
 *               category:
 *                 type: string
 *                 example: "Eten"
 *             required:
 *               - name
 *               - category
 *     responses:
 *       201:
 *         description: Ingredient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
ingredientRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ingredient = req.body as Ingredient;
        const newIngredient = await IngredientService.createIngredient(ingredient);
        res.status(201).json(newIngredient);
    } catch (error) {
        next(error);
    }
});

export default ingredientRouter;
