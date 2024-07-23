const assert = require('assert');
const sinon = require('sinon');
const controller = require('../../../src/api/controllers/PreGameCollaborationController');
const sails = { models: { user: { findOne: sinon.stub() }, pregamedm: { create: sinon.stub() } } };

describe('PreGameCollaborationController', () => {
  let req, res;

  beforeEach(() => {
    sinon.restore();
    res = {
      json: sinon.stub().returnsThis(),
      status: sinon.stub().returnsThis(),
      redirect: sinon.stub().returnsThis(),
    };

    req = {
      session: {
        userId: 1
      },
      body: {
        question1: 'answer1',
        question2: 'answer2',
        question3: 'answer3',
        question4: 'answer4',
        question5: 'answer5',
        question6: 'answer6'
      }
    };
  });

  it('should return an error when all fields are not present', async () => {
    // Arrange
    delete req.body.question1;

    // Act
    await controller.create(req, res);

    // Assert
    assert(res.status.calledOnceWith(400));
    assert(res.json.calledOnceWith({ error: 'All fields are required' }));
  });
});
