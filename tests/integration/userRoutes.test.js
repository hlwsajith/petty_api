const request = require('supertest');
const app = require('../../src/config/app');
const User = require('../../src/models/User');

describe('User Routes', () => {
  describe('GET /users', () => {
    it('should return an array of users', async () => {
      // Create dummy users in the database for testing
      await User.create([
        { name: 'John', email: 'john@example.com' },
        { name: 'Jane', email: 'jane@example.com' },
      ]);

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { name: 'John', email: 'john@example.com' },
        { name: 'Jane', email: 'jane@example.com' },
      ]);
    });
  });

  // Add more test cases for other user routes
});
