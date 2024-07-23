/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */

// Import necessary files and libraries
const controller = require('../../api/controllers/MyProfileController'); // Import the MyProfileController
const sinon = require('sinon'); // Import Sinon for stubbing and mocking
const assert = require('assert'); // Import assert for making assertions in tests

// Describe block for grouping related tests for the MyProfileController
describe('MyProfileController', () => {

  // Test case for showing profile form
  it('Should show profile form with user data', async () => {
    const userStub = sinon.stub(User, 'findOne').resolves({ id: 1, name: 'testUser' });

    const req = {
      session: {
        userId: 1
      }
    };

    const res = {
      view: sinon.stub()
    };

    await controller.showProfileForm(req, res);

    assert.strictEqual(userStub.calledOnce, true);
    assert.strictEqual(res.view.calledOnce, true);
    assert.strictEqual(res.view.args[0][0], 'pages/my-profile');
    assert.deepStrictEqual(res.view.args[0][1], { user: { id: 1, name: 'testUser' } });

    userStub.restore();
  });

  // Test case for showing profile form when user is not found
  it('Should return notFound if user is not found when showing profile form', async () => {
    const userStub = sinon.stub(User, 'findOne').resolves(null);

    const req = {
      session: {
        userId: 1
      }
    };

    const res = {
      notFound: sinon.stub()
    };

    await controller.showProfileForm(req, res);

    assert.strictEqual(userStub.calledOnce, true);
    assert.strictEqual(res.notFound.calledOnce, true);
    assert.strictEqual(res.notFound.args[0][0], 'User not found');

    userStub.restore();
  });

  // Test case for showing user profile
  it('Should show user profile', async () => {
    const userStub = sinon.stub(User, 'findOne').resolves({ id: 1, name: 'testUser' });

    const req = {
      session: {
        userId: 1
      }
    };

    const res = {
      view: sinon.stub()
    };

    await controller.showUserProfile(req, res);

    assert.strictEqual(userStub.calledOnce, true);
    assert.strictEqual(res.view.calledOnce, true);
    assert.strictEqual(res.view.args[0][0], 'pages/view-personal-profile');
    assert.deepStrictEqual(res.view.args[0][1], { user: { id: 1, name: 'testUser' } });

    userStub.restore();
  });

  // Test case for showing user profile when user is not found
  it('Should return notFound if user is not found when showing user profile', async () => {
    const userStub = sinon.stub(User, 'findOne').resolves(null);

    const req = {
      session: {
        userId: 1
      }
    };

    const res = {
      notFound: sinon.stub()
    };

    await controller.showUserProfile(req, res);

    assert.strictEqual(userStub.calledOnce, true);
    assert.strictEqual(res.notFound.calledOnce, true);
    assert.strictEqual(res.notFound.args[0][0], 'User not found');

    userStub.restore();
  });

});