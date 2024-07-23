/**
 * Feedbacks.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  // Attributes define the structure of the database table.
  attributes: {

    // 'from_id_user' attribute to store the user ID of the person giving the feedback.
    // It links to the User model, uses an integer column type, and is required.
    from_id_user: {
      model: 'user',
      columnType: 'integer',
      required: true
    },

    // 'TO_id_user' attribute to store the user ID of the feedback recipient.
    // It also links to the User model, uses an integer column type, and is required.
    TO_id_user: {
      model: 'user',
      columnType: 'integer',
      required: true
    },

    // 'feedback' attribute to store the actual feedback text.
    // It is a string and is required.
    feedback: {
      type: 'string',
      required: true
    },

    // 'feedback_type' attribute to categorize the feedback
    // It is a string and is required.
    feedback_type: {
      type: 'string',
      required: true
    },

    // 'game_round' attribute to indicate the specific game round or context in which the feedback was given.
    // It is a string and is required.
     game_round: { 
    type: 'string',
      required: true
    }
  },

};
