import { Review } from '../../model/Review';
import { User } from '../../model/User';
import { Recipe } from '../../model/Recipe';

const mockRecipe = new Recipe({
    id: 1,
    name: 'Mock Recipe',
    description: 'Mock description',
    reviews: [],
});

//I use this mockReview only to create a mock user. I don't use it in the tests.
const mockReview = new Review({ 
    id: 1,
    text: 'Mock Review',
    score: 5,
});

const mockUser = new User({
    username : 'JulieCanCook',
    password : 'I<3Cooking4Ever',
    email : 'thecookjulie@gmail.com',
    firstName : 'Julie',
    lastName : 'Lanssens',
    role : 'user',
    recipes : [mockRecipe],
    reviews : [mockReview],
});

test('given: valid review data; when: Review is created; then: properties are correctly assigned', () => {
    const reviewData = { text: 'Great recipe!', score: 5,};

    const review = new Review(reviewData);

    expect(review.text).toBe(reviewData.text);
    expect(review.score).toBe(reviewData.score);
});

test('given: two reviews with the same text, score, writer, and recipe; when: compared; then: equals() returns true', () => {
    const reviewData1 = { text: 'Amazing recipe', score: 5, writer: mockUser, recipe: mockRecipe };
    const reviewData2 = { text: 'Amazing recipe', score: 5, writer: mockUser, recipe: mockRecipe };

    const review1 = new Review(reviewData1);
    const review2 = new Review(reviewData2);

    expect(review1.equals(review2)).toBe(true);
});

test('given: two reviews with different texts, scores, writers, or recipes; when: compared; then: equals() returns false', () => {
    const differentUser = { equals: jest.fn(() => false) } as unknown as User;
    const differentRecipe = { equals: jest.fn(() => false) } as unknown as Recipe;

    const reviewData1 = { text: 'Amazing recipe', score: 5, writer: mockUser, recipe: mockRecipe };
    const reviewData2 = { text: 'Good recipe', score: 4, writer: differentUser, recipe: differentRecipe };

    const review1 = new Review(reviewData1);
    const review2 = new Review(reviewData2);

    expect(review1.equals(review2)).toBe(false);
});

// Validation Tests
test('given: missing review text; when: validated; then: it throws an error', () => {
    const invalidReviewData = { score: 5, writer: mockUser, recipe: mockRecipe };

    expect(() => new Review(invalidReviewData as any)).toThrow("Review text is required");
});

test('given: a score below 1; when: validated; then: it throws an error', () => {
    const invalidReviewData = { text: 'Bad recipe', score: 0, writer: mockUser, recipe: mockRecipe };

    expect(() => new Review(invalidReviewData as any)).toThrow("Score must be between 1 and 5");
});

test('given: a score above 5; when: validated; then: it throws an error', () => {
    const invalidReviewData = { text: 'Too good to be true', score: 6, writer: mockUser, recipe: mockRecipe };

    expect(() => new Review(invalidReviewData as any)).toThrow("Score must be between 1 and 5");
});
