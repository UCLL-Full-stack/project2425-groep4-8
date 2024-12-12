import { User } from '../../model/User';
import { Recipe } from '../../model/Recipe';
import { Review } from '../../model/Review';

const mockRecipe = new Recipe({
    id: 1,
    name: 'Mock Recipe',
    description: 'Mock description',
    reviews: [],
});

const mockReview = new Review({
    id: 1,
    text: 'Mock Review',
    score: 5,
});

// Tests

test('given: valid user data; when: User is created; then: properties are correctly assigned', () => {
    const username = 'JulieCanCook';
    const password = 'I<3Cooking4Ever';
    const email = 'thecookjulie@gmail.com';
    const firstName = 'Julie';
    const lastName = 'Lanssens';
    const role = 'user';
    const recipes = [mockRecipe];
    const reviews = [mockReview];

    const user = new User({ username, password, email, firstName, lastName, role, recipes, reviews });

    expect(user.username).toBe(username);
    expect(user.password).toBe(password);
    expect(user.email).toBe(email);
    expect(user.firstName).toBe(firstName);
    expect(user.lastName).toBe(lastName);
    expect(user.recipes).toEqual(recipes);
    expect(user.reviews).toEqual(reviews);
});

test('given an invalid username, when a User is created, then an error is thrown', () => {
    const role = 'user';
    expect(() => new User({ username: '', password: 'password123', email: 'test@example.com', firstName: 'test', lastName: 'test', role })).toThrow('Username is required');
    expect(() => new User({ username: 'ab', password: 'password123', email: 'test@example.com', firstName: 'test', lastName: 'test', role })).toThrow('Username must be at least 3 characters long');
});

test('given an invalid password, when a User is created, then an error is thrown', () => {
    const role = 'user';
    expect(() => new User({ username: 'test', password: '', email: 'test@example.com', firstName: 'test', lastName: 'test', role })).toThrow('Password is required');
});

test('given an invalid email, when a User is created, then an error is thrown', () => {
    const role = 'user';
    expect(() => new User({ username: 'test', password: 'password123', email: '', firstName: 'test', lastName: 'test', role })).toThrow('Email is required');
    expect(() => new User({ username: 'test', password: 'password123', email: 'test', firstName: 'test', lastName: 'test', role })).toThrow('Invalid email format');
});

test('given two users with the same username and email, when compared, then equals() returns true', () => {
    const role = 'user';
    const user1 = new User({
        username: 'test',
        password: 'password123',
        email: 'test@example.com',
        firstName: 'test',
        lastName: 'test',
        recipes: [mockRecipe],
        reviews: [mockReview],
        role,
    });
    const user2 = new User({
        username: 'test',
        password: 'password123',
        email: 'test@example.com',
        firstName: 'test',
        lastName: 'test',
        recipes: [],
        reviews: [],
        role,
    });

    expect(user1.equals(user2)).toBe(true);
});

test('given two users with different usernames or emails, when compared, then equals() returns false', () => {
    const role = 'user';
    const user1 = new User({
        username: 'test',
        password: 'password123',
        email: 'test@example.com',
        firstName: 'test',
        lastName: 'test',
        recipes: [mockRecipe],
        reviews: [mockReview],
        role,
    });
    const user2 = new User({
        username: 'testje',
        password: 'password123',
        email: 'testje@example.com',
        firstName: 'test',
        lastName: 'test',
        recipes: [mockRecipe],
        reviews: [mockReview],
        role,
    });

    expect(user1.equals(user2)).toBe(false);
});
