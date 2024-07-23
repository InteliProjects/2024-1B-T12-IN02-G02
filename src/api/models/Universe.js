/**
 * Universe.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const { findMembers } = require("../controllers/TeamController");

module.exports = {

  // Attributes define the structure of the database table.
  attributes: {

    // It is a string and required.
    number: {
      type: 'string',
      required: true
    },

    // 'gameId' attribute to link the universe to a specific game.
    // References the 'game' model, allowing for the association of universes with particular games.
    gameId: {
      model: 'game'
    },

    // 'teams' attribute to associate multiple teams with this universe.
    // Defines a relationship with the 'team' model, connected via 'universeId'.
    teams: {
      collection: 'team',
      via: 'universeId'
    },

    users: {
      collection: 'user',
      via:'universeId'
    },

    round: {
      type: 'number',
      required: true
    }

  },

};
