const assert = require('assert');
const UserController = require('../../api/controllers/UserController');

describe('UserController', () => {
  describe('#signup()', () => {
    it('should return an error if passwords do not match', async () => {
      // Prepare request object with mismatched passwords
      const req = {
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password1',
          confirmPassword: 'password2'
        }
      };
      // Prepare a mock response object
      const res = {
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        send: function(data) {
          this.body = data;
          return this;
        }
      };

      // Call the signup function
      await UserController.signup(req, res);

      // Assert the response status code and body
      assert.strictEqual(res.statusCode, 400);
      assert.deepStrictEqual(res.body, { error: 'Passwords do not match' });
    });

    // Add more test cases as needed to cover other scenarios
  });

  describe('#login()', () => {
    it('should return an error if email or password is missing', async () => {
      // Prepare request object with missing email
      const req = {
        body: {
          email: '',
          password: 'password'
        }
      };
      // Prepare a mock response object
      const res = {
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        send: function(data) {
          this.body = data;
          return this;
        }
      };

      // Call the login function
      await UserController.login(req, res);

      // Assert the response status code and body
      assert.strictEqual(res.statusCode, 400);
      assert.deepStrictEqual(res.body, { error: 'Email and password are required' });
    });

    // Add more test cases as needed to cover other scenarios
  });

  // Add more describe blocks to test other functions of your controller
});
