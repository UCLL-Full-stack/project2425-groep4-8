import UserDb from '../repository/User.db';
import { User } from '../model/User';
import bcrypt from 'bcrypt';

const getAllUsers = (): User[] => {
    return UserDb.getAllUsers();
};

const getUserById = (id: number): User => {
    return UserDb.getUserById(id);
};

const getUserByEmail = (email: string): User => {
    const user = UserDb.getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const getUserByUsername = (username: string): User => {
    const user = UserDb.getUserByUsername(username);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const createUser = async (user: User): Promise<User> => {
    // Check if the email already exists
    const existingUserByEmail = await UserDb.getUserByEmail(user.email);
    if (existingUserByEmail) {
        throw new Error('Email already exists');
    }

    // Check if the username already exists
    const existingUserByUsername = await UserDb.getUserByUsername(user.username);
    if (existingUserByUsername) {
        throw new Error('Username already exists');
    }

    // Ensure the password is provided
    if (!user.password) {
        throw new Error('Password is required');
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(user.password, 10);

    // Create the new user object with the hashed password
    const newUser = new User({
        username: user.username,
        password: hashedPassword,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        recipes: user.recipes,
        reviews: user.reviews
    });

    // Save the new user to the database
    return UserDb.createUser(newUser);
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUser,
};
