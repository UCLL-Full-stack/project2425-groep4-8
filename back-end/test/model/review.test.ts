import { Review } from '../../model/Review';
import { User } from '../../model/User';
import { Recipe } from '../../model/Recipe';

let mockUser: User;
let mockRecipe: Recipe;

beforeEach(() => {
    // Mock dependencies
    mockUser = { equals: jest.fn(() => true) } as unknown as User;
    mockRecipe = { equals: jest.fn(() => true) } as unknown as Recipe;
});

test('given valid review data, when a Review is created, then properties are correctly assigned', () => {
    // given
    const reviewData = { text: 'Great recipe!', score: 5, writer: mockUser, recipe: mockRecipe };

    // when
    const review = new Review(reviewData);

    // then
    expect(review.writer).toBe(reviewData.writer);
    expect(review.text).toBe(reviewData.text);
    expect(review.score).toBe(reviewData.score);
    expect(review.recipe).toBe(reviewData.recipe);
});

test('given two reviews with the same text, score, writer, and recipe, when compared, then equals() returns true', () => {
    // given
    const reviewData1 = { text: 'Amazing recipe', score: 5, writer: mockUser, recipe: mockRecipe };
    const reviewData2 = { text: 'Amazing recipe', score: 5, writer: mockUser, recipe: mockRecipe };

    const review1 = new Review(reviewData1);
    const review2 = new Review(reviewData2);

    // then
    expect(review1.equals(review2)).toBe(true);
});

test('given two reviews with different texts, scores, writers, or recipes, when compared, then equals() returns false', () => {
    // given
    const differentUser = { equals: jest.fn(() => false) } as unknown as User;
    const differentRecipe = { equals: jest.fn(() => false) } as unknown as Recipe;

    const reviewData1 = { text: 'Amazing recipe', score: 5, writer: mockUser, recipe: mockRecipe };
    const reviewData2 = { text: 'Good recipe', score: 4, writer: differentUser, recipe: differentRecipe };

    const review1 = new Review(reviewData1);
    const review2 = new Review(reviewData2);

    // then
    expect(review1.equals(review2)).toBe(false);
});

// Validation Tests
test('given missing review text, when validated, then it throws an error', () => {
    // given
    const invalidReviewData = { score: 5, writer: mockUser, recipe: mockRecipe };

    // then
    expect(() => new Review(invalidReviewData as any)).toThrow("Review text is required");
});

test('given a score below 1, when validated, then it throws an error', () => {
    // given
    const invalidReviewData = { text: 'Bad recipe', score: 0, writer: mockUser, recipe: mockRecipe };

    // then
    expect(() => new Review(invalidReviewData as any)).toThrow("Score must be between 1 and 5");
});

test('given a score above 5, when validated, then it throws an error', () => {
    // given
    const invalidReviewData = { text: 'Too good to be true', score: 6, writer: mockUser, recipe: mockRecipe };

    // then
    expect(() => new Review(invalidReviewData as any)).toThrow("Score must be between 1 and 5");
});
