/**
 * Tutor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  // Attributes define the structure of the database table.
  attributes: {
    // It is a string and is required.
    name: {
      type: 'string',
      required: true
    },

    // 'email' attribute to store the tutor's email address.
    // It must be a valid email format.
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },

    // 'password' attribute for the tutor's account login.
    // It is a string and required for authentication purposes.
    password: {
      type: 'string',
      required: true
    },

    // 'nationality' attribute to store the tutor's nationality.
    // It is to be used for demographic information or regional preferences and is required.
    nationality: {
      type: 'string',
      required: true
    },

    // 'time_zone' attribute to store the tutor's operational or local time zone.
    // This is crucial for scheduling purposes and is required.
    time_zone: {
      type: 'string',
      required: true
    },

    // 'gender' attribute to store the tutor's gender.
    // This information is optional and can be used for demographic analysis or personalization.
    gender: {
      type: 'string'
    },
    
    // This is optional and helps in managing tutor availability.
    status: {
      type: 'string'
    },

    // 'curiosity' attribute to capture any additional interests information about the tutor.
    // This is an optional field.
    curiosity: {
      type: 'string'
    },

    // It requires a connection to the 'team' model.
    id_team: {
      model: 'team',
      columnType: 'integer',
      required: true
    }
  },

};

