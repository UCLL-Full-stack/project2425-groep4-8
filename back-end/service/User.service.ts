import UserDb from '../repository/User.db';
import { User } from '../model/User';
import bcrypt from 'bcrypt';
import { AuthenticationRespone, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => {
    return UserDb.getAllUsers();
};

const getUserById = async (id: number): Promise<User | null> => {
    return UserDb.getUserById(id);
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    return UserDb.getUserByEmail(email);
};

const getUserByUsername = async (username: string): Promise<User> => {
    return UserDb.getUserByUsername(username);
};

const createUser = async (user: UserInput): Promise<User> => {
    const bestaandeUsername = await getUserByUsername(user.username);
    if (bestaandeUsername) {
        throw new Error('User already exists');
    }

    const bestaandeEmail = await getUserByEmail(user.email);
    if (bestaandeEmail) {
        throw new Error('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Create the new user object with the hashed password
    const newUser = new User({
        username: user.username,
        password: hashedPassword,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        recipes: [],
        reviews: [],
    });

    // Save the new user to the database
    return UserDb.createUser(newUser);
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationRespone> => {
    const user = await getUserByUsername(username);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw new Error('Incorrect password');
    }

    return {
        token: generateJwtToken({ username, role: user.role }),
        username,
        fullname: `${user.firstName} ${user.lastName}`,
        role: user.role,
    };
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUser,
    authenticate,
};
