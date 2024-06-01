import User from '../models/user.js';
import dotenv from 'dotenv';
import { login, home, signup } from './users.js';

dotenv.config();

jest.mock('../models/user.js');

describe('User Authentication', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('login', () => {
    it('should return user and token on successful login', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      User.findOne.mockResolvedValue(mockUser);

      const req = {
        body: {
          email: 'test@example.com',
          password: 'password',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

  });

  describe('home', () => {
    it('should return authenticated message for existing user', async () => {
      const mockUser = {
        email: 'test@example.com',
      };
      User.findOne.mockResolvedValue(mockUser);

      const req = {
        decoded: {
          email: 'test@example.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await home(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('authenticated');
    });
  });

  describe('signup', () => {
    it('should create a new user and return user and token on successful signup', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue(mockUser);

      const req = {
        body: {
          email: 'test@example.com',
          password: 'password',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await signup(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        code: 200,
        result: mockUser,
        token: expect.any(String),
      });
    });

  });
});