// tests/controllers/userController.test.js

const userController = require('../../src/controllers/userController');
const User = require('../../src/models/User');

describe('UserController Tests', () => {
  it('should create a new user', async () => {
    const mockUser = { username: 'testUser', email: 'test@example.com' };
    const req = { body: mockUser };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    User.prototype.save = jest.fn().mockResolvedValue(mockUser);

    await userController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(mockUser);
  });

  // Añadir más pruebas según sea necesario
});
