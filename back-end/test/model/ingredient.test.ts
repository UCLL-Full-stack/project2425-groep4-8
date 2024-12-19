import { Ingredient } from '../../model/Ingredient';

const mockIngredient = new Ingredient({
    name: 'Sugar',
    category: 'Sweetener'
});

const mockIngredient2 = new Ingredient({
    name: 'Salt',
    category: 'Spice'
});

const invalidIngredientData = new Ingredient({ 
    name: '',
    category: 'Sweetener' 
});

const invalidIngredientData2 = new Ingredient({ 
    name: 'Salt',
    category: '' 
});

test('given: valid ingredient data; when: Ingredient is created; then: properties are correctly assigned', () => {
    const ingredient = new Ingredient(mockIngredient);

    expect(ingredient.name).toBe(mockIngredient.name);
    expect(ingredient.category).toBe(mockIngredient.category);
});

test('given: two ingredients with the same name and category; when: compared; then: equals() returns true', () => {
    const ingredient1 = new Ingredient(mockIngredient);
    const ingredient2 = new Ingredient(mockIngredient);

    expect(ingredient1.equals(ingredient2)).toBe(true);
});

test('given: two ingredients with different names or categories; when: compared; then: equals() returns false', () => {
    const ingredient1 = new Ingredient(mockIngredient);
    const ingredient2 = new Ingredient(mockIngredient2);

    expect(ingredient1.equals(ingredient2)).toBe(false);
});

