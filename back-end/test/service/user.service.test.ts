import UserService from '../../service/User.service';
import UserDb from '../../repository/User.db';
import { User } from '../../model/User';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../../util/jwt';
import { Recipe } from '../../model/Recipe';
import { Review } from '../../model/Review';

jest.mock('../../repository/User.db');
jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashedPassword'),
    hashSync: jest.fn().mockReturnValue('hashedPassword'),
    compare: jest.fn(),
}));
jest.mock('../../util/jwt', () => ({
    generateJwtToken: jest.fn().mockReturnValue('mockJwtToken'),
}));

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

const mockUserData = {
    username: 'testuser',
    password: 'password123',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: 'user',
    recipes: [mockRecipe],
    reviews: [mockReview],
};

const mockUser = new User({
    username: mockUserData.username,
    password: 'hashedPassword',
    email: mockUserData.email,
    firstName: mockUserData.firstName,
    lastName: mockUserData.lastName,
    role: 'user',
    recipes: mockUserData.recipes,
    reviews: mockUserData.reviews,
});


const mockUserForCreate = new User({
    username: mockUserData.username,
    password: mockUserData.password,
    email: mockUserData.email,
    firstName: mockUserData.firstName,
    lastName: mockUserData.lastName,
    role: 'user',
    recipes: mockUserData.recipes,
    reviews: mockUserData.reviews,
});

let mockGetAllUsers: jest.Mock;
let mockGetUserById: jest.Mock;
let mockGetUserByEmail: jest.Mock;
let mockGetUserByUsername: jest.Mock;
let mockCreateUser: jest.Mock;

beforeEach(() => {
    jest.clearAllMocks();

    mockGetAllUsers = jest.fn();
    mockGetUserById = jest.fn();
    mockGetUserByEmail = jest.fn();
    mockGetUserByUsername = jest.fn();
    mockCreateUser = jest.fn();

    UserDb.getAllUsers = mockGetAllUsers;
    UserDb.getUserById = mockGetUserById;
    UserDb.getUserByEmail = mockGetUserByEmail;
    UserDb.getUserByUsername = mockGetUserByUsername;
    UserDb.createUser = mockCreateUser;
});

test('given valid data, when getAllUsers is called, then it returns a list of users', async () => {
    mockGetAllUsers.mockResolvedValue([mockUser]);

    const users = await UserService.getAllUsers();

    expect(users).toHaveLength(1);
    expect(users[0]).toEqual(mockUser);
    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
});

test('given valid user ID, when getUserById is called, then it returns the user', async () => {
    mockGetUserById.mockResolvedValue(mockUser);

    const user = await UserService.getUserById(1);

    expect(user).toEqual(mockUser);
    expect(mockGetUserById).toHaveBeenCalledWith(1);
});

test('given invalid user ID, when getUserById is called, then it returns null', async () => {
    mockGetUserById.mockResolvedValue(null);

    const user = await UserService.getUserById(1);

    expect(user).toBeNull();
    expect(mockGetUserById).toHaveBeenCalledWith(1);
});

test('given valid data, when createUser is called, then it creates a user and returns it', async () => {
    mockGetUserByEmail.mockResolvedValue(null);
    mockGetUserByUsername.mockResolvedValue(null);
    mockCreateUser.mockResolvedValue(mockUser);

    const user = await UserService.createUser(mockUserForCreate);

    expect(user).toEqual(mockUser);
    expect(mockGetUserByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(mockGetUserByUsername).toHaveBeenCalledWith(mockUser.username);
    expect(mockCreateUser).toHaveBeenCalledWith({
        ...mockUserForCreate,
        password: 'hashedPassword',
    });
});

test('given existing email, when createUser is called, then it throws an error', async () => {
    mockGetUserByEmail.mockResolvedValue(mockUser);

    await expect(UserService.createUser(mockUserForCreate)).rejects.toThrow(
        'Email already exists'
    );
});

test('given existing username, when createUser is called, then it throws an error', async () => {
    mockGetUserByEmail.mockResolvedValue(null);
    mockGetUserByUsername.mockResolvedValue(mockUser);

    await expect(UserService.createUser(mockUserForCreate)).rejects.toThrow(
        'Username already exists'
    );
});

test('given valid credentials, when authenticate is called, then it returns an authentication response', async () => {
    mockGetUserByUsername.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    const authResponse = await UserService.authenticate({
        username: mockUserData.username,
        password: mockUserData.password,
    });

    expect(authResponse).toEqual({
        token: 'mockJwtToken',
        username: mockUserData.username,
        fullname: `${mockUserData.firstName} ${mockUserData.lastName}`,
        role: mockUserData.role,
    });
    expect(mockGetUserByUsername).toHaveBeenCalledWith(mockUserData.username);
    expect(bcrypt.compare).toHaveBeenCalledWith(mockUserData.password, 'hashedPassword');
});

test('given invalid password, when authenticate is called, then it throws an error', async () => {
    mockGetUserByUsername.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    await expect(
        UserService.authenticate({
            username: mockUserData.username,
            password: 'wrongPassword',
        })
    ).rejects.toThrow('Incorrect password');
});

test('given non-existent username, when authenticate is called, then it throws an error', async () => {
    mockGetUserByUsername.mockResolvedValue(null);

    await expect(
        UserService.authenticate({
            username: 'nonExistentUser',
            password: 'password123',
        })
    ).rejects.toThrow();
});
