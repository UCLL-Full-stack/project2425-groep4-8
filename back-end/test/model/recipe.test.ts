import { User } from '../../model/User';
import { Recipe } from '../../model/Recipe';
import { Review } from '../../model/Review';
import { RecipeIngredient } from '@prisma/client';

//I use this mockReview only to create a mock recipe. I don't use it in the tests.
const mockReview = new Review({ 
    id: 1,
    text: 'Mock Review',
    score: 5,
});

const mockRecipe = new Recipe({
    id: 1,
    name: 'Mock Recipe',
    description: 'Mock description',
    reviews: [],
});

const mockRecipe2 = new Recipe({
    id: 2,
    name: 'Mock2 Recipe',
    description: 'Mock2 description',
    reviews: [],
});

const mockRecipeWithReview = new Recipe({
    id: 3,
    name: 'Mock3 Recipe',
    description: 'Mock3 description',
    reviews: [mockReview],
});



test('given: valid recipe data; when: Recipe is created; then: properties are correctly assigned', () => {
    const recipe = new Recipe(mockRecipe);

    expect(recipe.name).toBe(mockRecipe.name);
    expect(recipe.description).toBe(mockRecipe.description);
    expect(recipe.reviews).toEqual(mockRecipe.reviews);
});

test('given: two recipes with the same name, creator, and ingredients; when: compared; then: equals() returns true', () => {
    const recipe1 = new Recipe(mockRecipe);
    const recipe2 = new Recipe(mockRecipe);

    expect(recipe1.equals(recipe2)).toBe(true);
});

test('given: two recipes with different names or creators; when: compared; then: equals() returns false', () => {
    const recipe1 = new Recipe(mockRecipe);
    const recipe2 = new Recipe(mockRecipe2);

    expect(recipe1.equals(recipe2)).toBe(false);
});

test('given: valid recipe data containing a review; when: Recipe is created; then: properties are correctly assigned', () => {
    const recipe = new Recipe(mockRecipeWithReview);

    expect(recipe.name).toBe(mockRecipeWithReview.name);
    expect(recipe.description).toBe(mockRecipeWithReview.description);
    expect(recipe.reviews).toEqual(mockRecipeWithReview.reviews);
    expect(recipe.reviews).toContain(mockReview);
});