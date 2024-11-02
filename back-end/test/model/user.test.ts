import { User } from '../../model/User';
import { Recipe } from '../../model/Recipe';
import { Review } from '../../model/Review';

let mockRecipe: Recipe;
let mockReview: Review;

beforeEach(() => {
    // Mock Recipe
    mockRecipe = {
        id: 1,
        name: 'Mock Recipe',
        description: 'Mock description',
        recipeIngredients: [
            { id: 1, amount: 2, measurementType: 'cups', recipeId: 1, ingredientId: 1 },
            { id: 2, amount: 1, measurementType: 'tablespoon', recipeId: 1, ingredientId: 2 }
        ],
        creator: {} as User,
        reviews: [],
        validate: jest.fn().mockReturnValue(true), 
        equals: jest.fn().mockReturnValue(true),
    };

    // Mock Review
    mockReview = {
        id: 1,
        writer: {} as User,
        text: 'Mock Review',
        score: 5,
        recipe: mockRecipe,
        validate: jest.fn().mockReturnValue(true), 
        equals: jest.fn().mockReturnValue(true),
    };
});


test('given valid user data, when a User is created, then properties are correctly assigned', () => {
    const username = 'testuser';
    const password = 'password123';
    const email = 'test@example.com';
    const firstName = 'Test';
    const lastName = 'User';
    const recipes = [mockRecipe];
    const reviews = [mockReview];

    const user = new User(username, password, email, firstName, lastName, recipes, reviews);

    expect(user.username).toBe(username);
    expect(user.password).toBe(password);
    expect(user.email).toBe(email);
    expect(user.firstName).toBe(firstName);
    expect(user.lastName).toBe(lastName);
    expect(user.recipes).toEqual(recipes);
    expect(user.reviews).toEqual(reviews);
});

test('given an invalid username, when a User is created, then an error is thrown', () => {
    expect(() => new User('', 'password123', 'test@example.com', 'Test', 'User', [], [])).toThrow("Username is required");
    expect(() => new User('ab', 'password123', 'test@example.com', 'Test', 'User', [], [])).toThrow("Username must be at least 3 characters long");
});

test('given an invalid password, when a User is created, then an error is thrown', () => {
    expect(() => new User('testuser', '', 'test@example.com', 'Test', 'User', [], [])).toThrow("Password is required");
    expect(() => new User('testuser', 'short', 'test@example.com', 'Test', 'User', [], [])).toThrow("Password must be at least 8 characters long");
});

test('given an invalid email, when a User is created, then an error is thrown', () => {
    expect(() => new User('testuser', 'password123', '', 'Test', 'User', [], [])).toThrow("Email is required");
    expect(() => new User('testuser', 'password123', 'invalidemail', 'Test', 'User', [], [])).toThrow("Invalid email format");
});

test('given two users with the same username and email, when compared, then equals() returns true', () => {
    const user1 = new User('testuser', 'password123', 'test@example.com', 'Test', 'User', [mockRecipe], [mockReview]);
    const user2 = new User('testuser', 'anotherpassword', 'test@example.com', 'Test2', 'User2', [], []);

    expect(user1.equals(user2)).toBe(true);
});

test('given two users with different usernames or emails, when compared, then equals() returns false', () => {
    const user1 = new User('testuser', 'password123', 'test@example.com', 'Test', 'User', [mockRecipe], [mockReview]);
    const user2 = new User('anotheruser', 'password123', 'another@example.com', 'Test', 'User', [mockRecipe], [mockReview]);

    expect(user1.equals(user2)).toBe(false);
});
