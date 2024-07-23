/**
 * Team.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  // Attributes define the structure of the database table.
  attributes: {
    // 'name' attribute to store the name of the team.
    // It is a string and is required.
    name: {
      type: 'string',
      required: true,
    },

    // 'universeId' attribute to link the team to a specific universe, if applicable.
    // References the 'universe' model.
    universeId: {
      model: 'universe'
    },

    // Defines a relationship with the 'user' model, connected via 'teamId'.
    members: {
      collection: 'user',
      via: 'teamId'
    },

    // 'gameId' attribute to link the team to a specific game.
    // References the 'game' model. This linkage is important for associating teams with particular games,
    gameId: {
      model: 'game'
    }
  },
};

