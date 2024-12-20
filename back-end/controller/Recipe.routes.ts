import RecipeService from '../service/Recipe.service';
import { Recipe } from '../model/Recipe';
import express, { NextFunction, Request, Response } from 'express';
import { Role } from '../types';

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
 *         ingredients:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the ingredient.
 *               category:
 *                 type: string
 *                 description: The category of the ingredient used in the recipe.
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
 *     security:
 *      - bearerAuth: []
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
 *     security:
 *      - bearerAuth: []
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
 *     security:
 *      - bearerAuth: []
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
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 54
 *                     name:
 *                       type: string
 *                       example: Flour
 *                     category:
 *                       type: string
 *                       example: Baking
 *             required:
 *               - name
 *               - description
 *               - ingredients
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

/**
 * @swagger
 * /recipes/{userId}/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a recipe by ID for a specific user (restricted by user role)
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user associated with the recipe
 *         schema:
 *           type: number
 *           example: 101
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the recipe to update
 *         schema:
 *           type: number
 *           example: 42
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Recipe Name"
 *               description:
 *                 type: string
 *                 example: "Updated description of the recipe."
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 12
 *                     name:
 *                       type: string
 *                       example: "Sugar"
 *                     category:
 *                       type: string
 *                       example: "Baking"
 *             required:
 *               - name
 *               - description
 *               - ingredients
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       403:
 *         description: Access denied
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Internal server error
 */
recipeRouter.put('/:userId/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { role: Role } };
        const id = parseInt(req.params.id);
        const userId = parseInt(req.params.userId);
        const updatedRecipe = req.body;

        const result = await RecipeService.updateRecipeByIdWithRole(
            id,
            updatedRecipe,
            request.auth.role,
            userId
        );

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export default recipeRouter;
