import IngredientService from '../../service/Ingredient.service'; // Adjust the path as needed
import IngredientDb from '../../repository/Ingredient.db';
import { Ingredient } from '../../model/Ingredient';

// Mocking IngredientDb functions
jest.mock('../../repository/Ingredient.db');

// Create a mock Ingredient instance
const mockIngredient = new Ingredient({
    id: 1,
    name: 'Test Ingredient',
    category: 'Test Category',
});

// Reset mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
});

test('getAllIngredients should return a list of ingredients', async () => {
    (IngredientDb.getAllIngredients as jest.Mock).mockResolvedValue([mockIngredient]);

    const ingredients = await IngredientService.getAllIngredients();

    expect(ingredients).toHaveLength(1);
    expect(ingredients[0]).toEqual(mockIngredient);
    expect(IngredientDb.getAllIngredients).toHaveBeenCalledTimes(1);
});

test('getIngredientById should return an ingredient if found', async () => {
    (IngredientDb.getIngredientById as jest.Mock).mockResolvedValue(mockIngredient);

    const ingredient = await IngredientService.getIngredientById(1); // Using mockIngredient.id

    expect(ingredient).toEqual(mockIngredient);
    expect(IngredientDb.getIngredientById).toHaveBeenCalledWith(1);
});

test('getIngredientById should return null if ingredient is not found', async () => {
    (IngredientDb.getIngredientById as jest.Mock).mockResolvedValue(null);

    const ingredient = await IngredientService.getIngredientById(2); // ID that does not exist

    expect(ingredient).toBeNull();
    expect(IngredientDb.getIngredientById).toHaveBeenCalledWith(2);
});

test('createIngredient should create an ingredient and return it', async () => {
    (IngredientDb.createIngredient as jest.Mock).mockResolvedValue(mockIngredient);

    const ingredient = await IngredientService.createIngredient(mockIngredient);

    expect(ingredient).toEqual(mockIngredient);
    expect(IngredientDb.createIngredient).toHaveBeenCalledWith(mockIngredient);
});