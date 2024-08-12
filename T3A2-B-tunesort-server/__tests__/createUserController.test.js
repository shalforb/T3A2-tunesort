
const { createUser, loginUser } = require('../controllers/userController');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('User Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('should create a new user and return 201 status', async () => {
            const req = { body: { email: 'test@example.com', password: 'password123' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            bcrypt.hash.mockResolvedValue('hashedPassword');
            User.prototype.save = jest.fn().mockResolvedValue({ email: 'test@example.com' });

            await createUser(req, res);

            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
            expect(User.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
        });

        it('should return 500 status if an error occurs', async () => {
            const req = { body: { email: 'test@example.com', password: 'password123' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            bcrypt.hash.mockRejectedValue(new Error('Hashing error'));

            await createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating user' });
        });
    });

    describe('loginUser', () => {
        it('should login the user and return a token', async () => {
            const req = { body: { email: 'test@example.com', password: 'password123' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            const mockUser = { email: 'test@example.com', password: 'hashedPassword' };
            User.findOne = jest.fn().mockResolvedValue(mockUser);
            bcrypt.compare = jest.fn().mockResolvedValue(true);
            jwt.sign = jest.fn().mockReturnValue('token');

            await loginUser(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
            expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
            expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            expect(res.json).toHaveBeenCalledWith({ token: 'token', message: 'Login successful' });
        });

        it('should return 400 status if email or password is incorrect', async () => {
            const req = { body: { email: 'test@example.com', password: 'wrongpassword' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            User.findOne = jest.fn().mockResolvedValue(null);

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
        });
    });
});
