import UserService from '../../service/User.service';
import UserDb from '../../repository/User.db';
import { User } from '../../model/User';
import bcrypt from 'bcrypt';

// Mocking UserDb functions
jest.mock('../../repository/User.db');

// jest.setup.js
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'), // Default return value for hash
}));


const mockUserData = {
    username: 'testuser',
    password: 'password123',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    recipes: [],
    reviews: [],
};


// Create a User instance for testing
const mockUser = new User(
    mockUserData.username,
    mockUserData.password,
    mockUserData.email,
    mockUserData.firstName,
    mockUserData.lastName,
    mockUserData.recipes,
    mockUserData.reviews
);


beforeEach(() => {
    jest.clearAllMocks();
});

test('getAllUsers should return a list of users', async () => {
    (UserDb.getAllUsers as jest.Mock).mockResolvedValue([mockUser]);

    const users = await UserService.getAllUsers();

    expect(users).toHaveLength(1);
    expect(users[0]).toEqual(mockUser);
    expect(UserDb.getAllUsers).toHaveBeenCalledTimes(1);
});

test('getUserById should return a user if found', async () => {
    (UserDb.getUserById as jest.Mock).mockResolvedValue(mockUser);

    const user = await UserService.getUserById(1);

    expect(user).toEqual(mockUser);
    expect(UserDb.getUserById).toHaveBeenCalledWith(1);
});

test('getUserById should return null if user is not found', async () => {
    (UserDb.getUserById as jest.Mock).mockResolvedValue(null);

    const user = await UserService.getUserById(1);

    expect(user).toBeNull();
    expect(UserDb.getUserById).toHaveBeenCalledWith(1);
});

test('createUser should create a user and return it', async () => {
    (UserDb.getUserByEmail as jest.Mock).mockResolvedValue(null); 
    (UserDb.getUserByUsername as jest.Mock).mockResolvedValue(null); 
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    (UserDb.createUser as jest.Mock).mockResolvedValue(mockUser);

    const user = await UserService.createUser(mockUser);

    expect(user).toEqual(mockUser);
    expect(UserDb.getUserByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(UserDb.getUserByUsername).toHaveBeenCalledWith(mockUser.username);
    expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.password, 10);
});

test('createUser should throw an error if email already exists', async () => {
    (UserDb.getUserByEmail as jest.Mock).mockResolvedValue(mockUser); // Simulate existing email

    await expect(UserService.createUser(mockUser)).rejects.toThrow("Email already exists");
});