/**
 * PreGameCollaboration.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {


  // Attributes define the structure of the database table.
  attributes: {
    // 'userId' attribute to link the self-assessment to a specific user.
    // References the 'user' model and is required to associate the data with a user.
    userId: {
      model: 'user', // Reference to the user who made the self-assessment
      required: true
    },

    // Attributes 'question1' to 'question6' to store responses to the self-assessment questions.
    // Each is a string and must be one of the specified choices ('A', 'B', 'C', 'D', 'E').
    // All are required and have a description indicating they are responses to specific questions.
    question1: {
      type: 'string',
      isIn: ['A', 'B', 'C', 'D', 'E'], // The answer must be one of these choices
      required: true,
      description: 'Answer for question 1'
    },
    question2: {
      type: 'string',
      isIn: ['A', 'B', 'C', 'D', 'E'],
      required: true,
      description: 'Answer for question 2'
    },
    question3: {
      type: 'string',
      isIn: ['A', 'B', 'C', 'D', 'E'],
      required: true,
      description: 'Answer for question 3'
    },
    question4: {
      type: 'string',
      isIn: ['A', 'B', 'C', 'D', 'E'],
      required: true,
      description: 'Answer for question 4'
    },
    question5: {
      type: 'string',
      isIn: ['A', 'B', 'C', 'D', 'E'],
      required: true,
      description: 'Answer for question 5'
    },
    question6: {
      type: 'string',
      isIn: ['A', 'B', 'C', 'D', 'E'],
      required: true,
      description: 'Answer for question 6'
    },
    profile: {
      type: 'string',
    }
  },

};

