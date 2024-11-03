import { Ingredient } from '../../model/Ingredient';

test('given valid ingredient data, when an Ingredient is created, then properties are correctly assigned', () => {
    // given
    const ingredientData = { name: 'Sugar', category: 'Sweetener' };

    // when
    const ingredient = new Ingredient(ingredientData);

    // then
    expect(ingredient.name).toBe(ingredientData.name);
    expect(ingredient.category).toBe(ingredientData.category);
});

test('given two ingredients with the same name and category, when compared, then equals() returns true', () => {
    // given
    const ingredientData1 = { name: 'Salt', category: 'Spice' };
    const ingredientData2 = { name: 'Salt', category: 'Spice' };

    const ingredient1 = new Ingredient(ingredientData1);
    const ingredient2 = new Ingredient(ingredientData2);

    // then
    expect(ingredient1.equals(ingredient2)).toBe(true);
});

test('given two ingredients with different names or categories, when compared, then equals() returns false', () => {
    // given
    const ingredientData1 = { name: 'Sugar', category: 'Sweetener' };
    const ingredientData2 = { name: 'Salt', category: 'Spice' };

    const ingredient1 = new Ingredient(ingredientData1);
    const ingredient2 = new Ingredient(ingredientData2);

    // then
    expect(ingredient1.equals(ingredient2)).toBe(false);
});

test('given missing ingredient name, when validated, then it throws an error', () => {
    // given
    const invalidIngredientData = { category: 'Sweetener' };

    // then
    expect(() => new Ingredient(invalidIngredientData as any)).toThrow("Ingredient name is required");
});

test('given missing ingredient category, when validated, then it throws an error', () => {
    // given
    const invalidIngredientData = { name: 'Sugar' };

    // then
    expect(() => new Ingredient(invalidIngredientData as any)).toThrow("Ingredient category is required");
});