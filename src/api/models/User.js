/**
 * User.js
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

    // 'email' attribute to store the user's email address.
    // It must be a valid email format.
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },

    // 'password' attribute for the user's account security.
    // It is a string and required for authentication.
    password: {
      type: 'string',
      required: true
    },

    // 'teamId' attribute to link the user to a specific team, if applicable.
    teamId: {
      model: 'team'
    },

    // 'gameId' attribute to link the user to a specific game, if involved in gaming platforms.
    gameId: {
      model: 'game'
    },

    universeId: {
      model: 'universe'
    },

    // 'timeZone' attribute to store the user's local time zone.
    timeZone: {
      type: 'string'
    },

    // 'gender' attribute to capture the user's gender.
    gender: {
      type: 'string'
    },

    // 'pronouns' attribute to capture the user's pronouns.
    pronouns: {
      type: 'string'
    },

    // 'status' attribute to represent the current state or status of the user.
    status: {
      type: 'string',
      isIn: ['ONLINE', 'OFFLINE'],
      defaultsTo: 'OFFLINE'
    },

    // 'happinessMeter' attribute to store a metric or value representing the user's current happiness or satisfaction level.
    happinessMeter: {
      type: 'number'
    },

    // Social media attributes to store the user's social media handles.
    instagram: {
      type: 'string'
    },
    facebook: {
      type: 'string'
    },
    twitter: {
      type: 'string'
    },

    // 'firstLanguage' attribute to store the user's first language.
    firstLanguage: {
      type: 'string'
    },

    // 'phone' attribute to store the user's phone number.
    phone: {
      type: 'string'
    },

    // 'state' attribute to store the user's state of residence.
    country: {
      type: 'string'
    },

    // 'university' attribute to store the user's educational affiliation.
    university: {
      type: 'string'
    },

    // 'birthdate' attribute to store the user's date of birth.
    birthdate: {
      type: 'string'
    },

    // 'profileImage' attribute to store the user's profile image.
    profileImage: {
      type: 'string',
    },

  },

};
