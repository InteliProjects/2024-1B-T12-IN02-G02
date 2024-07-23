/**
 * AdminControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// api/controllers/AdminController.js

module.exports = {

  //Creating a Team
  createGame: async function(req, res) {
    try {
      const newGame = await Game.create({
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate
      }).fetch();
      console.log(newGame);
      return res.redirect(`/admin/createUniverses?gameId=${newGame.id}`); // Assuming a visualization route to list games
    } catch (error) {
      return res.serverError(error);
    }
  },
  //

  createUniversesPage: function(req, res) {
    const gameId = req.query.gameId;
    if (!gameId) {
      return res.badRequest('Missing gameId parameter');
    }
    // Assuming you have a view 'createUniverses.ejs' in 'views/admin/'
    return res.view('pages/admin/createUniverses', { gameId: gameId });
  },

  //Creating a Universe
  createUniverse: async function(req, res) {
    try {
      const gameId = req.session.gameId || req.body.gameId;
      if (!gameId) {
        return res.badRequest('Missing gameId');
      }

      const newUniverse = await Universe.create({
        number: req.body.number,
        gameId: gameId,
        round: 1
      }).fetch();

      console.log(newUniverse);

      // Redirect to createTeams
      return res.redirect(`/admin/createTeams?universeId=${newUniverse.id}&gameId=${gameId}`);
    } catch (error) {
      console.error('Error in createUniverse:', error);
      return res.serverError(error);
    }
  },

  createTeamsPage: async function(req, res) {
    // Retrieve gameId and universeId from the query
    const { gameId, universeId } = req.query;

    // Recover users from the session
    const users = req.session.users || [];

    // Load view with user data and necessary identifiers
    return res.view('pages/admin/createTeams', {
      users: users,
      gameId: gameId,
      universeId: universeId
    });
  },

  //Creating Team
  createTeam: async function(req, res) {

    console.log(req.body);

    const { color, universeId, members } = req.body;
    try {
      const newTeam = await Team.create({
        name: color,
        universeId: universeId
      }).fetch();

      // Associate members to the team using addMembers
      await Team.addToCollection(newTeam.id, 'members').members(members);

      await Universe.addToCollection(universeId, 'teams').members(newTeam.id);

      for (const memberId of members) {
        await User.update({ id: memberId }).set({ universeId: universeId });
      }

      console.log('New Team', newTeam);

      return res.redirect('/admin/createTeams');
    } catch (error) {
      return res.serverError('Error creating team');
    }
  },

  updateTeam : async function (req, res) {
    const teamId = req.body.teamId;
    const members = req.body.newMembers;
    try {

      await Team.addToCollection(teamId, 'members').members(members);

      req.session.alertMessage = 'Membros do time atualizados com sucessos';
      return res.redirect('/admin/createTeams');
    } catch (error) {
      return res.json({message: error});
    }
  },

  //Listing Universes
  listUniverse: async function(req, res) {
    try {
      const universes = await Universe.find({});
      console.log('listUniverse:', universes);
      return res.json(universes);
    } catch (error) {
      return res.serverError('Error fetching universes');
    }
  },

  //Listing Users
  listUser: async function(req, res) {
    try {
      const users = await User.find({});
      console.log('listUser:', users);
      return res.json(users);
    } catch (error) {
      return res.serverError('Error fetching users');
    }
  },

  updateRound: async function (req, res) {

    const { universeId, round } = req.body;

    console.log(req.body.round);

    try {
      let updatedUniverse = await Universe.updateOne({ id: universeId }).set({
        round: round
      });
      console.log(updatedUniverse);
      return res.json({ updatedUniverse });
    } catch (err) {
      return res.json({ error });
    }
  },

  //Listing Teams
  listTeam: async function(req, res) {
    try {
      const team = await Team.find({});
      console.log('listTeam:', team);
      return res.json(team);
    } catch (error) {
      return res.serverError('Error fetching users');
    }
  },
};

