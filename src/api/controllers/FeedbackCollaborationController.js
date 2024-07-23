/* eslint-disable camelcase */
/**
 * FeedbackCollaborationController
 *
 * @description :: Server-side actions for handling incoming requests related to feedback collaboration.
 * @help        :: See https://sailsjs.com/docs/concepts/actions for more information on Sails actions.
 */

module.exports = {

  /**
   * `FeedbackCollaborationController.round()`
   * Fetch feedbacks for a specific round for the logged-in user.
   */
  round: async function (req, res) {
    try {
      const round = req.body.round; // Get the round number from the request body
      const userId = req.session.user.id; // Get the user ID from the session

      let feedbacks;
      // Fetch feedbacks for the first round or the previous round depending on the current round number
      if (round === 1) {
        feedbacks = await PeerEvaluationCollaboration.find({
          to_id_user: userId,
          round: 1
        });
      } else {
        feedbacks = await PeerEvaluationCollaboration.find({
          to_id_user: userId,
          round: round - 1
        });
      }
      console.log(feedbacks); // Log the fetched feedbacks

      return res.json(feedbacks); // Send the feedbacks as JSON response

    } catch (error) {
      return res.json(error); // Return the error if any occurs
    }
  },

  /**
   * `FeedbackCollaborationController.showFeedbacks()`
   * Show feedbacks for the current user by retrieving associated team and universe details.
   */
  showFeedbacks: async function (req, res) {
    console.log('showFeedbacks');
    try {
      const userId = req.session.user.id; // Retrieve user ID from session
      console.log('User ID:', userId);

      // Find the user with the associated team
      const user = await User.findOne({ id: userId }).populate('teamId');
      if (!user) {
        console.error('Usuário não encontrado');
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      console.log('User:', user);

      // Find the user's team and populate the associated universe
      const userTeam = user.teamId;
      if (!userTeam) {
        console.error('Usuário não associado a um time');
        return res.status(404).json({ error: 'Usuário não associado a um time' });
      }
      console.log('User Team:', userTeam);

      const team = await Team.findOne({ id: userTeam.id }).populate('universeId');
      if (!team) {
        console.error('Time não encontrado');
        return res.status(404).json({ error: 'Time não encontrado' });
      }
      console.log('Team:', team);

      const universe = team.universeId;
      if (!universe) {
        console.error('Universo não encontrado para o time');
        return res.status(404).json({ error: 'Universo não encontrado para o time' });
      }
      console.log('Universe:', universe);

      const currentRound = universe.round;
      console.log('currentRound:', currentRound);

      // Fetch feedbacks for the first round or the previous round depending on the current round number
      let feedbacks;
      if (currentRound === 1) {
        feedbacks = await PeerEvaluationCollaboration.find({
          to_id_user: userId,
          round: 1
        });
      } else {
        feedbacks = await PeerEvaluationCollaboration.find({
          to_id_user: userId,
          round: currentRound - 1
        });
      }

      console.log('feedbacks:', feedbacks);
      return res.json(feedbacks); // Send the feedbacks as JSON response

    } catch (error) {
      console.error('Error in showFeedbacks:', error);
      return res.status(500).json({ error: 'Internal Server Error' }); // Handle internal server errors
    }
  }

};
