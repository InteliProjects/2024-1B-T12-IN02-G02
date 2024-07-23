const assert = require('assert');
const sinon = require('sinon');
const OtherProfileController = require('../../../src/api/controllers/OtherProfileController');

describe('OtherProfileController', () => {
  let req, res, findOneStub;

  beforeEach(() => {
    sinon.restore();

    res = {
      json: sinon.stub().returnsThis(),
      status: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis(),
      view: sinon.stub().returnsThis(),
    };

    req = {
      query: {},
      params: {},
    };

    // Mock the User model
    global.User = {
      findOne: sinon.stub()
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('profile', () => {
    it('should return 400 if userId is not provided', async () => {
      await OtherProfileController.profile(req, res);
      assert(res.status.calledWith(400));
      assert(res.send.calledWith('User ID is required'));
    });

    it('should return 404 if user is not found', async () => {
      req.query.userId = '1';
      User.findOne.resolves(null);

      await OtherProfileController.profile(req, res);

      assert(res.status.calledWith(404));
      assert(res.send.calledWith('User not found'));
    });

    it('should return user view if user is found', async () => {
      req.query.userId = '1';
      User.findOne.resolves({ id: '1', name: 'Test User' });

      await OtherProfileController.profile(req, res);

      assert(res.view.calledWith('pages/other-profile', { userId: '1' }));
    });

    it('should return 500 on server error', async () => {
      req.query.userId = '1';
      User.findOne.rejects(new Error('Server error'));

      await OtherProfileController.profile(req, res);

      assert(res.status.calledWith(500));
      assert(res.send.calledWith('Server error'));
    });
  });

  describe('getUser', () => {
    it('should return 400 if userId is not provided', async () => {
      await OtherProfileController.getUser(req, res);
      assert(res.status.calledWith(400));
      assert(res.send.calledWith('User ID is required'));
    });

    it('should return 404 if user is not found', async () => {
      req.params.id = '1';
      User.findOne.resolves(null);

      await OtherProfileController.getUser(req, res);

      assert(res.status.calledWith(404));
      assert(res.send.calledWith('User not found'));
    });

    it('should return user data if user is found', async () => {
      req.params.id = '1';
      User.findOne.resolves({ id: '1', name: 'Test User' });

      await OtherProfileController.getUser(req, res);

      assert(res.json.calledWith({ id: '1', name: 'Test User' }));
    });

    it('should return 500 on server error', async () => {
      req.params.id = '1';
      User.findOne.rejects(new Error('Server error'));

      await OtherProfileController.getUser(req, res);

      assert(res.status.calledWith(500));
      assert(res.send.calledWith('Server error'));
    });
  });
});
