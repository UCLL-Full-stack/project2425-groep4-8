import UserService from '../service/User.service';
import { User } from '../model/User';
import express, { NextFunction, Request, Response } from 'express';
import { UserInput } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Username of the user.
 *           example: "john_doe"
 *         email:
 *           type: string
 *           description: Email of the user.
 *           example: "john@example.com"
 *         firstName:
 *           type: string
 *           description: First name of the user.
 *           example: "John"
 *         lastName:
 *           type: string
 *           description: Last name of the user.
 *           example: "Doe"
 *     UserInput:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *         - firstName
 *         - lastName
 *       properties:
 *         username:
 *           type: string
 *           description: Unique username for the user.
 *           example: "johnneke"
 *         password:
 *           type: string
 *           description: User's password.
 *           example: "chef123"
 *         email:
 *           type: string
 *           description: Email address of the user.
 *           example: "john.doe@example.com"
 *         firstName:
 *           type: string
 *           description: First name of the user.
 *           example: "John"
 *         lastName:
 *           type: string
 *           description: Last name of the user.
 *           example: "Doe"
 *         role:
 *           type: string
 *           description: Role assigned to the user.
 *           example: "admin"
 *     AuthenticationRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *           example: "chefjohn"
 *         password:
 *           type: string
 *           description: The password of the user.
 *           example: "chef123"
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message.
 *           example: "Authentication successful."
 *         token:
 *           type: string
 *           description: JWT access token.
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         username:
 *           type: string
 *           description: Username of the authenticated user.
 *           example: "chefjohn"
 *         fullname:
 *           type: string
 *           description: Full name of the authenticated user.
 *           example: "John Doe"
 *   responses:
 *     UserCreated:
 *       description: The user was successfully created.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getUserById(Number(req.params.id));
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get a user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.get('/email/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getUserByEmail(req.params.email);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/username/{username}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get a user by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.get('/username/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = req.params.username;
        const user = await UserService.getUserByUsername(username);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/UserCreated'
 *       400:
 *         description: Bad request. Missing or invalid fields in the request body.
 *       500:
 *         description: Internal server error.
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const userData = <UserInput>req.body;
        const createdUser = await UserService.createUser(userData);
        res.status(201).json(createdUser);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 example: "admin123"
 *     responses:
 *       200:
 *         description: Authentication successful, returns user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = <UserInput>req.body;
        const user = await UserService.authenticate(userData);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

export default userRouter;
