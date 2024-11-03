// import database from "../util/database";
// import { User } from "../model/User";

// const getAllUsers = async (): Promise<User[]> => {
//     const userPrisma = await database.user.findMany();

//     if (!userPrisma || userPrisma.length === 0) {
//         return [];
//     }

//     return userPrisma.map((userPrisma) => User.from(userPrisma));
// };

// const getUserById = async (id: number): Promise<User | null> => {
//     const userPrisma = await database.user.findUnique({
//         where: {
//             id: id,
//         },
//     });

//     if (!userPrisma) {
//         return null;
//     }

//     return User.from(userPrisma);
// };

// const getUserByEmail = async (email: string): Promise<User | null> => {
//     const userPrisma = await database.user.findFirst({
//         where: {
//             email: email,
//         },
//     });

//     if (!userPrisma) {
//         return null;
//     }

//     return User.from(userPrisma);
// }

// const getUserByUsername = async (username: string): Promise<User | null> => {
//     const userPrisma = await database.user.findFirst({
//         where: {
//             username: username,
//         },
//     });

//     if (!userPrisma) {
//         return null;
//     }

//     return User.from(userPrisma);
// }

// const createUser = async (user: User): Promise<User> => {
//     const userPrisma = await database.user.create({
//         data: {
//             username: user.username,
//             password: user.password,
//             email: user.email,
//         },
//     });

//     return User.from(userPrisma);
// };

// export default {
//     getAllUsers,
//     getUserById,
//     getUserByEmail,
//     getUserByUsername,
//     createUser,
// };

import database from '../util/database';
import { User } from '../model/User';

const users: User[] = [
    new User({
        id: 1,
        username: 'Julie',
        password: 'examplePassword',
        email: 'example@example.com',
        firstName: 'Julie',
        lastName: 'Lanssens',
        recipes: [],
        reviews: [],
    }),
];

const getAllUsers = (): User[] => {
    return users;
};

const getUserById = (id: number): User => {
    const user = users.find((user) => user.id === id);
    if (!user) {
        throw new Error(`User with id ${id} not found`);
    }
    return user;
};

const getUserByEmail = (email: string): User | null => {
    return users.find((user) => user.email === email) || null;
};

const getUserByUsername = (username: string): User | null => {
    return users.find((user) => user.username === username) || null;
};

const createUser = (user: User): User => {
    const newId = users.length > 0 ? (users[users.length - 1]?.id ?? 0) + 1 : 1;
    const newUser = new User({
        id: newId,
        username: user.username,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        recipes: user.recipes,
        reviews: user.reviews,
    });
    users.push(newUser);
    return newUser;
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUser,
};
