const UserController = require('../../src/controllers/UserController');
const User = require('../../src/models/User');

describe('UserController', () => {
  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      // Mock User.find() to return dummy data
      User.find = jest.fn().mockResolvedValue([
        { name: 'John', email: 'john@example.com' },
        { name: 'Jane', email: 'jane@example.com' },
      ]);

      const mockReq = {};
      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await UserController.getAllUsers(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith([
        { name: 'John', email: 'john@example.com' },
        { name: 'Jane', email: 'jane@example.com' },
      ]);
    });
  });

  // Add more test cases for other UserController methods
});
