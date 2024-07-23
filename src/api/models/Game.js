/**
 * Game.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  // Attributes define the structure of the database table.
  attributes: {
    // 'name' attribute to store the name of the game.
    // It is a string and is required.
    name: {
      type: 'string',
      required: true
    },

    // 'teams' attribute to associate multiple teams with a game.
    // It defines a relationship to the 'team' model and connects via 'gameId'.
    teams: {
    collection: 'team',
      via: 'gameId'
    },

    // 'members' attribute to associate multiple users with a game.
    // It defines a relationship to the 'user' model and connects via 'gameId'.
    members: {
      collection: 'user',
      via: 'gameId'
    },

    // 'startDate' attribute to store the starting date and time of the game.
    // It is stored as a timestamp and is required.
    startDate: {
      type: 'string',
      columnType: 'timestamp',
      required: true
    },

    // 'endDate' attribute to store the ending date and time of the game.
    // It is stored as a timestamp and is required.
    endDate: {
      type: 'string',
      columnType: 'timestamp',
      required: true
    },

    // 'universes' attribute to associate multiple universes with a game.
    // It defines a relationship to the 'universe' model and connects via 'gameId'.
    universes: {
      collection: 'universe',
      via: 'gameId'
    }
  },
};
