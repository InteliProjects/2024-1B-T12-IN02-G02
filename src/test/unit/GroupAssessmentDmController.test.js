const assert = require('assert'); // Import the assert library for making assertions in tests
const sinon = require('sinon'); // Import the sinon library for creating stubs, and mocks
const controller = require('../../../src/api/controllers/GroupAssessmentDmController'); // Import the controller to be tested

describe(' Test GroupAssessmentDmController', () => { // Define a test suite for the GroupAssessmentDmController
  let req; let res; // Declare variables for the request and response objects

  beforeEach(() => {
    // Reset any stub/mock between tests to avoid shared states
    sinon.restore();

    // Create stubs for RESPONSE methods
    res = {
      json: sinon.stub().returnsThis(), // Stub for res.json method
      forbidden: sinon.stub().returnsThis(), // Stub for res.forbidden method
      badRequest: sinon.stub().returnsThis(), // Stub for res.badRequest method
      serverError: sinon.stub().returnsThis() // Stub for res.serverError method
    };

    // Define a valid request as a base
    req = {
      session: {
        userId: 1, // Simulates a logged-in user

      },
      body: {
        analytical: JSON.stringify([{ id: 'member1' }]), // JSON string for the analytical field
        conceptual: JSON.stringify([{ id: 'member2' }]), // JSON string for the conceptual field
        directive: JSON.stringify([{ id: 'member3' }]), // JSON string for the directive field
        behavioral: JSON.stringify([{ id: 'member4' }]) // JSON string for the behavioral field
      }
    };
  });

  it('Should return an error when the user is not logged in', async () => { // Test case for a non-logged-in user
    // Remove userId from session to simulate a non-logged-in user
    req.session.userId = null;

    // Call the create method of the controller with the mocked request and RESPONSE
    await controller.create(req, res);

    // Verify if the correct response was sent
    assert(res.forbidden.calledOnce, 'Expected forbidden to be called once'); // Check if res.forbidden was called once
    assert(res.forbidden.calledWith('You need to be logged in to perform this action.'), 'Expected error message about needing to be logged in'); // Check if res.forbidden was called with the correct message
  });

  it('Should return an error when the "analytical" field is missing', async () => { // Test case for missing "analytical" field
    // Remove the "analytical" field
    delete req.body.analytical;

    // Call the create method of the controller with the mocked request and RESPONSE
    await controller.create(req, res);

    // Verify if the correct response was sent
    assert(res.badRequest.calledOnce, 'Expected badRequest to be called once'); // Check if res.badRequest was called once
    assert(res.badRequest.calledWith('All fields are mandatory.'), 'Expected error message about missing fields'); // Check if res.badRequest was called with the correct message
  });

  it('Should return an error when the "conceptual" field is missing', async () => { // Test case for missing "conceptual" field
    // Remove the "conceptual" field
    delete req.body.conceptual;

    // Call the create method of the controller with the mocked request and RESPONSE
    await controller.create(req, res);

    // Verify if the correct response was sent
    assert(res.badRequest.calledOnce, 'Expected badRequest to be called once'); // Check if res.badRequest was called once
    assert(res.badRequest.calledWith('All fields are mandatory.'), 'Expected error message about missing fields'); // Check if res.badRequest was called with the correct message
  });

  it('Should return an error when the "directive" field is missing', async () => { // Test case for missing "directive" field
    // Remove the "directive" field
    delete req.body.directive;

    // Call the create method of the controller with the mocked request and RESPONSE
    await controller.create(req, res);

    // Verify if the correct response was sent
    assert(res.badRequest.calledOnce, 'Expected badRequest to be called once'); // Check if res.badRequest was called once
    assert(res.badRequest.calledWith('All fields are mandatory.'), 'Expected error message about missing fields'); // Check if res.badRequest was called with the correct message
  });

  it('Should return an error when the "behavioral" field is missing', async () => { // Test case for missing "behavioral" field
    // Remove the "behavioral" field
    delete req.body.behavioral;

    // Call the create method of the controller with the mocked request and RESPONSE
    await controller.create(req, res);

    // Verify if the correct response was sent
    assert(res.badRequest.calledOnce, 'Expected badRequest to be called once'); // Check if res.badRequest was called once
    assert(res.badRequest.calledWith('All fields are mandatory.'), 'Expected error message about missing fields'); // Check if res.badRequest was called with the correct message
  });
});
