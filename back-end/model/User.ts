import { Recipe } from './Recipe';
import { Review } from './Review';

export class User {
    readonly id?: number;
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly recipes?: Recipe[];
    readonly reviews?: Review[];

    constructor(user: {
        id?: number;
        username: string;
        password: string;
        email: string;
        firstName: string;
        lastName: string;
        recipes?: Recipe[];
        reviews?: Review[];
    }) {
        this.validate(user);
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.recipes = user.recipes;
        this.reviews = user.reviews;
    }

    private validate(user: {
        username: string;
        password: string;
        email: string;
        firstName: string;
        lastName: string;
    }) {
        if (!user.username) throw new Error('Username is required');
        if (user.username.length < 3)
            throw new Error('Username must be at least 3 characters long');

        if (!user.password) throw new Error('Password is required');

        const emailRegex = /\S+@\S+\.\S+/;
        if (!user.email) throw new Error('Email is required');
        if (!emailRegex.test(user.email)) throw new Error('Invalid email format');

        if (!user.firstName) throw new Error('First name is required');
        if (!user.lastName) throw new Error('Last name is required');
    }

    equals(user: User): boolean {
        return this.username === user.username && this.email === user.email;
    }

    // static from(userPrisma: any): User {
    //     return new User(
    //         userPrisma.username,
    //         userPrisma.password,
    //         userPrisma.email,
    //         userPrisma.firstName,
    //         userPrisma.lastName,
    //         userPrisma.recipes,
    //         userPrisma.reviews
    //     );
    // }
}
