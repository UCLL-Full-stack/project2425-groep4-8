import RecipeService from '../../service/Recipe.service';
import RecipeDb from '../../repository/Recipe.db';
import { Recipe } from '../../model/Recipe';
import { User } from '../../model/User';

// Mocking RecipeDb functions
jest.mock('../../repository/Recipe.db');

// Create an empty User instance for testing
const mockUser = new User({
    username: 'test',
    password: 'password123',
    email: 'test@example.com',
    firstName: 'test',
    lastName: 'test',
    recipes: [],
    reviews: [],
    role: "user",
});

// Create an empty Recipe instance for testing
const mockRecipe = new Recipe({
    id: 0, // or any default value you prefer
    name: 'test',
    description: 'test',
    ingredients: [],
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

    const recipe = await RecipeService.getRecipeById(1);

    expect(recipe).toEqual(mockRecipe);
    expect(RecipeDb.getRecipeById).toHaveBeenCalledWith(1);
});

test('getRecipeById should return null if recipe is not found', async () => {
    (RecipeDb.getRecipeById as jest.Mock).mockResolvedValue(null);

    const recipe = await RecipeService.getRecipeById(1);

    expect(recipe).toBeNull();
    expect(RecipeDb.getRecipeById).toHaveBeenCalledWith(1);
});

test('createRecipe should create a recipe and return it', async () => {
    (RecipeDb.createRecipe as jest.Mock).mockResolvedValue(mockRecipe);
    const numberofid = 0
    const recipe = await RecipeService.createRecipe(mockRecipe, numberofid);

    expect(recipe).toEqual(mockRecipe);
    expect(RecipeDb.createRecipe).toHaveBeenCalledWith(mockRecipe, 0);
});
