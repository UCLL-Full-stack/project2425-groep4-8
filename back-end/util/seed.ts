import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    // Cleanup
    await prisma.review.deleteMany();
    await prisma.recipe.deleteMany();
    await prisma.ingredient.deleteMany();
    await prisma.user.deleteMany();

    // Create Ingredients (with ID, name, and category)
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

    const butter = await prisma.ingredient.create({
        data: {
            name: 'Butter',
            category: 'Dairy',
        },
    });

    const milk = await prisma.ingredient.create({
        data: {
            name: 'Milk',
            category: 'Dairy',
        },
    });

    const vanilla = await prisma.ingredient.create({
        data: {
            name: 'Vanilla Extract',
            category: 'Flavoring',
        },
    });

    const chocolate = await prisma.ingredient.create({
        data: {
            name: 'Chocolate',
            category: 'Sweets',
        },
    });

    const bakingPowder = await prisma.ingredient.create({
        data: {
            name: 'Baking Powder',
            category: 'Baking',
        },
    });

    const salt = await prisma.ingredient.create({
        data: {
            name: 'Salt',
            category: 'Spices',
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
            role: 'admin',
        },
    });

    const chef = await prisma.user.create({
        data: {
            username: 'chefjohn',
            password: await bcrypt.hash('chef123', 12),
            email: 'chefjohn@cookingapp.com',
            firstName: 'John',
            lastName: 'Doe',
            role: 'chef',
        },
    });

    const reviewer = await prisma.user.create({
        data: {
            username: 'reviewerjane',
            password: await bcrypt.hash('review123', 12),
            email: 'jane@reviews.com',
            firstName: 'Jane',
            lastName: 'Smith',
            role: 'user',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'foodlover123',
            password: await bcrypt.hash('foodie123', 12),
            email: 'foodlover123@cookingapp.com',
            firstName: 'Lover',
            lastName: 'Food',
            role: 'user',
        },
    });

    // Create Recipes and link Ingredients by ID
    const pancakeRecipe = await prisma.recipe.create({
        data: {
            name: 'Pancakes',
            description: 'Fluffy homemade pancakes',
            userId: chef.id,
            ingredients: {
                connect: [{ id: flour.id }, { id: sugar.id }, { id: egg.id }],
            },
        },
    });

    const cakeRecipe = await prisma.recipe.create({
        data: {
            name: 'Vanilla Cake',
            description: 'Classic vanilla-flavored cake',
            userId: chef.id,
            ingredients: {
                connect: [
                    { id: flour.id },
                    { id: sugar.id },
                    { id: egg.id },
                    { id: butter.id },
                    { id: milk.id },
                    { id: vanilla.id },
                ],
            },
        },
    });

    const chocolateCake = await prisma.recipe.create({
        data: {
            name: 'Chocolate Cake',
            description: 'Decadent chocolate cake with rich frosting',
            userId: chef.id,
            ingredients: {
                connect: [
                    { id: flour.id },
                    { id: sugar.id },
                    { id: egg.id },
                    { id: butter.id },
                    { id: chocolate.id },
                    { id: bakingPowder.id },
                    { id: salt.id },
                ],
            },
        },
    });

    const chocolateChipCookies = await prisma.recipe.create({
        data: {
            name: 'Chocolate Chip Cookies',
            description: 'Classic chocolate chip cookies with a crunchy texture',
            userId: chef.id,
            ingredients: {
                connect: [
                    { id: flour.id },
                    { id: sugar.id },
                    { id: egg.id },
                    { id: butter.id },
                    { id: chocolate.id },
                ],
            },
        },
    });

    // Create Reviews
    await prisma.review.create({
        data: {
            text: 'The cake was too sweet for my taste.',
            score: 3,
            recipeId: cakeRecipe.id,
            userId: reviewer.id,
        },
    });

    await prisma.review.create({
        data: {
            text: 'The pancakes were absolutely amazing, light and fluffy!',
            score: 5,
            recipeId: pancakeRecipe.id,
            userId: user2.id,
        },
    });

    await prisma.review.create({
        data: {
            text: 'Chocolate cake is my all-time favorite! Perfect for chocolate lovers.',
            score: 5,
            recipeId: chocolateCake.id,
            userId: reviewer.id,
        },
    });

    await prisma.review.create({
        data: {
            text: 'Cookies came out great! Loved the crispy edges.',
            score: 4,
            recipeId: chocolateChipCookies.id,
            userId: user2.id,
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
