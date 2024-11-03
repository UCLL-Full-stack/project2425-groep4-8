import RecipeService from '../../service/Recipe.service'; // Adjust the path as needed
import RecipeDb from '../../repository/Recipe.db';
import { Recipe } from '../../model/Recipe';
import { User } from '../../model/User';

// Mocking RecipeDb functions
jest.mock('../../repository/Recipe.db');

// Create a mock User instance
const mockUser = new User('test', 'te2321st', 'test@gmail.com', 'test', 'test', [], []);

// Create a mock Recipe instance
const mockRecipe = new Recipe({
    id: 0,
    name: 'Test Recipe',
    description: 'A test recipe for unit testing.',
    creator: mockUser,
    recipeIngredients: [],
    reviews: [],
});

// Reset mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
});

test('getAllRecipes should return a list of recipes', async () => {
    (RecipeDb.getAllRecipes as jest.Mock).mockResolvedValue([mockRecipe]);

    const recipes = await RecipeService.getAllRecipes();

    expect(recipes).toHaveLength(1);
    expect(recipes[0]).toEqual(mockRecipe);
    expect(RecipeDb.getAllRecipes).toHaveBeenCalledTimes(1);
});

test('getRecipeById should return a recipe if found', async () => {
    (RecipeDb.getRecipeById as jest.Mock).mockResolvedValue(mockRecipe);

    const recipe = await RecipeService.getRecipeById(0); // Using mockRecipe.id

    expect(recipe).toEqual(mockRecipe);
    expect(RecipeDb.getRecipeById).toHaveBeenCalledWith(0);
});

test('getRecipeById should return null if recipe is not found', async () => {
    (RecipeDb.getRecipeById as jest.Mock).mockResolvedValue(null);

    const recipe = await RecipeService.getRecipeById(1); // ID that does not exist

    expect(recipe).toBeNull();
    expect(RecipeDb.getRecipeById).toHaveBeenCalledWith(1);
});

test('createRecipe should create a recipe and return it', async () => {
    (RecipeDb.createRecipe as jest.Mock).mockResolvedValue(mockRecipe);

    const recipe = await RecipeService.createRecipe(mockRecipe);

    expect(recipe).toEqual(mockRecipe);
    expect(RecipeDb.createRecipe).toHaveBeenCalledWith(mockRecipe);
});
