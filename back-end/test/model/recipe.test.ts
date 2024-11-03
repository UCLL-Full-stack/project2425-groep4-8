import { User } from '../../model/User';
import { Recipe } from '../../model/Recipe';
import { Review } from '../../model/Review';
import { RecipeIngredient } from '@prisma/client';

let mockUser: User;
let mockReview: Review;

beforeEach(() => {
    // Initialize mockUser
    mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'securepassword',
        firstName: 'Test',
        lastName: 'User',
        validate: jest.fn(),
        equals: jest.fn(),
    } as unknown as User;

    // Initialize mockReview
    mockReview = {
        id: 1,
        writer: mockUser,
        text: 'Mock Review',
        score: 5,
        recipe: {} as Recipe,
        validate: jest.fn().mockReturnValue(true),
        equals: jest.fn().mockReturnValue(true),
    };
});

test('given valid recipe data, when a Recipe is created, then properties are correctly assigned', () => {
    const recipeData = {
        name: 'Spaghetti Bolognese',
        description: 'Delicious pasta with meat sauce',
        recipeIngredients: [
            {
                id: 1,
                amount: 200,
                measurementType: 'g',
                recipeId: 1,
                ingredientId: 1,
            } as RecipeIngredient,
            {
                id: 2,
                amount: 300,
                measurementType: 'g',
                recipeId: 1,
                ingredientId: 2,
            } as RecipeIngredient,
            {
                id: 3,
                amount: 400,
                measurementType: 'ml',
                recipeId: 1,
                ingredientId: 3,
            } as RecipeIngredient,
        ],
        creator: mockUser,
        reviews: [],
    };

    const recipe = new Recipe(recipeData);

    expect(recipe.name).toBe(recipeData.name);
    expect(recipe.description).toBe(recipeData.description);
    expect(recipe.recipeIngredients).toEqual(recipeData.recipeIngredients);
    expect(recipe.creator).toEqual(mockUser);
    expect(recipe.reviews).toEqual(recipeData.reviews);
});

test('given two recipes with the same name, creator, and ingredients, when compared, then equals() returns true', () => {
    const recipe1 = new Recipe({
        name: 'Mock Recipe',
        description: 'Description',
        recipeIngredients: [],
        creator: mockUser,
        reviews: [],
    });
    const recipe2 = new Recipe({
        name: 'Mock Recipe',
        description: 'Description',
        recipeIngredients: [],
        creator: mockUser,
        reviews: [],
    });

    expect(recipe1.equals(recipe2)).toBe(true);
});

test('given two recipes with different names or creators, when compared, then equals() returns false', () => {
    const recipe1 = new Recipe({
        name: 'Mock Recipe',
        description: 'Description',
        recipeIngredients: [],
        creator: mockUser,
        reviews: [],
    });
    const recipe2 = new Recipe({
        name: 'Another Recipe',
        description: 'Description',
        recipeIngredients: [],
        creator: mockUser,
        reviews: [],
    });

    expect(recipe1.equals(recipe2)).toBe(false);
});
