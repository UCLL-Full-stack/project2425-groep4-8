// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    // Cleanup
    await prisma.recipeIngredient.deleteMany();
    await prisma.review.deleteMany();
    await prisma.recipe.deleteMany();
    await prisma.ingredient.deleteMany();
    await prisma.user.deleteMany();

    // Create Ingredients
    const flour = await prisma.ingredient.create({
        data: {
            name: 'Flour',
            category: 'Baking',
        },
    });

    const sugar = await prisma.ingredient.create({
        data: {
            name: 'Sugar',
            category: 'Baking',
        },
    });

    const egg = await prisma.ingredient.create({
        data: {
            name: 'Egg',
            category: 'Dairy',
        },
    });

    // Create Users
    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: await bcrypt.hash('admin123', 12),
            email: 'admin@cookingapp.com',
            firstName: 'Admin',
            lastName: 'User',
        },
    });

    const chef = await prisma.user.create({
        data: {
            username: 'chefjohn',
            password: await bcrypt.hash('chef123', 12),
            email: 'chefjohn@cookingapp.com',
            firstName: 'John',
            lastName: 'Doe',
        },
    });

    const reviewer = await prisma.user.create({
        data: {
            username: 'reviewerjane',
            password: await bcrypt.hash('review123', 12),
            email: 'jane@reviews.com',
            firstName: 'Jane',
            lastName: 'Smith',
        },
    });

    // Create Recipes
    const pancakeRecipe = await prisma.recipe.create({
        data: {
            name: 'Pancakes',
            description: 'Fluffy homemade pancakes',
            userId: chef.id,
        },
    });

    const cakeRecipe = await prisma.recipe.create({
        data: {
            name: 'Vanilla Cake',
            description: 'Classic vanilla-flavored cake',
            userId: chef.id,
        },
    });

    // Create RecipeIngredients
    await prisma.recipeIngredient.createMany({
        data: [
            {
                recipeId: pancakeRecipe.id,
                ingredientId: flour.id,
                amount: 200,
                measurementType: 'grams',
            },
            {
                recipeId: pancakeRecipe.id,
                ingredientId: egg.id,
                amount: 2,
                measurementType: 'pieces',
            },
            {
                recipeId: pancakeRecipe.id,
                ingredientId: sugar.id,
                amount: 50,
                measurementType: 'grams',
            },
            {
                recipeId: cakeRecipe.id,
                ingredientId: flour.id,
                amount: 250,
                measurementType: 'grams',
            },
            {
                recipeId: cakeRecipe.id,
                ingredientId: sugar.id,
                amount: 100,
                measurementType: 'grams',
            },
        ],
    });

    // Create Reviews
    await prisma.review.create({
        data: {
            text: 'Delicious pancakes!',
            score: 5,
            recipeId: pancakeRecipe.id,
            userId: reviewer.id,
        },
    });

    await prisma.review.create({
        data: {
            text: 'The cake was too sweet for my taste.',
            score: 3,
            recipeId: cakeRecipe.id,
            userId: reviewer.id,
        },
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
