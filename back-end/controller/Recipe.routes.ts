import RecipeService from '../service/Recipe.service';
import { Recipe } from '../model/Recipe';
import express, { NextFunction, Request, Response } from 'express';

const recipeRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Recipe:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         name:
 *           type: string
 *           description: The name of the recipe.
 *         description:
 *           type: string
 *           description: A brief description of the recipe.
 *         recipeIngredients:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount of the ingredient.
 *               measurementType:
 *                 type: string
 *                 description: The type of measurement (e.g., grams, cups).
 *               ingredientId:
 *                 type: integer
 *                 description: The ID of the ingredient used in the recipe.
 *         creator:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               format: int64
 *             name:
 *               type: string
 *         reviews:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               content:
 *                 type: string
 *               rating:
 *                 type: integer
 */

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: List of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       500:
 *         description: Internal server error
 */
recipeRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipes = await RecipeService.getAllRecipes();
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Get a recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the recipe to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Recipe found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Internal server error
 */
recipeRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipe = await RecipeService.getRecipeById(Number(req.params.id));
        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }
        res.status(200).json(recipe);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /recipes/{userId}:
 *   post:
 *     summary: Create a new recipe for a specific user
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user creating the recipe
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Spaghetti Bolognese"
 *               description:
 *                 type: string
 *                 example: "A classic Italian dish with pasta and meat sauce."
 *               recipeIngredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     amount:
 *                       type: number
 *                       example: 200
 *                     measurementType:
 *                       type: string
 *                       example: "grams"
 *                     ingredientId:
 *                       type: integer
 *                       example: 1
 *             required:
 *               - name
 *               - description
 *               - recipeIngredients
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
recipeRouter.post('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipe = req.body as Recipe;
        const userId = parseInt(req.params.userId);
        console.log(userId);
        const newRecipe = await RecipeService.createRecipe(recipe, userId);
        res.status(201).json(newRecipe);
    } catch (error) {
        next(error);
    }
});

export default recipeRouter;
