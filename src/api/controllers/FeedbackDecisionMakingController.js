/**
 * FeedbackDecisionMakingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
   * `FeedbackDecisionMakingController.round()`
   * Controller action to retrieve feedbacks based on the round number.
   */
  round: async function (req, res) {
    try {
      const round = req.body.round; // Extract round number from request body
      console.log(round); // Log the round number
      const userId = req.session.user.id; // Get user ID from session
      console.log(userId); // Log the user ID

      let feedbacks;

      // Retrieve peer evaluations based on the specified round
      if (round === 1) {
        feedbacks = await PeerEvaluationDm.find({
          to_id_user: userId,
          round: 1
        });
      } else {
        feedbacks = await PeerEvaluationDm.find({
          to_id_user: userId,
          round: round - 1
        });
      }

      console.log(feedbacks); // Log the retrieved feedbacks
      return res.json(feedbacks); // Respond with JSON containing feedbacks
    } catch (error) {
      return res.json(error); // Respond with the error encountered
    }
  },

  /**
   * `FeedbackDecisionMakingController.showFeedbacks()`
   * Controller action to show feedbacks for the current user.
   */
  showFeedbacks: async function (req, res) {
    console.log('showFeedbacks'); // Log function start
    try {
      const userId = req.session.user.id; // Get user ID from session
      console.log('User ID:', userId); // Log the user ID

      // Find the user and populate their associated team
      const user = await User.findOne({ id: userId }).populate('teamId');
      if (!user) {
        console.error('User not found'); // Log error if user not found
        return res.status(404).json({ error: 'User not found' }); // Respond with 404 status and error message
      }
      console.log('User:', user); // Log the user object

      const userTeam = user.teamId; // Get the user's team ID
      if (!userTeam) {
        console.error('User not associated with a team'); // Log error if user not associated with a team
        return res.status(404).json({ error: 'User not associated with a team' }); // Respond with 404 status and error message
      }
      console.log('User Team:', userTeam); // Log the user's team object

      // Find the team and populate its associated universe
      const team = await Team.findOne({ id: userTeam.id }).populate('universeId');
      if (!team) {
        console.error('Team not found'); // Log error if team not found
        return res.status(404).json({ error: 'Team not found' }); // Respond with 404 status and error message
      }
      console.log('Team:', team); // Log the team object

      const universe = team.universeId; // Get the universe associated with the team
      if (!universe) {
        console.error('Universe not found for the team'); // Log error if universe not found
        return res.status(404).json({ error: 'Universe not found for the team' }); // Respond with 404 status and error message
      }
      console.log('Universe:', universe); // Log the universe object

      const currentRound = universe.round; // Get the current round from the universe
      console.log('currentRound:', currentRound); // Log the current round number

      let feedbacks;

      // Retrieve peer evaluations based on the current or previous round
      if (currentRound === 1) {
        feedbacks = await PeerEvaluationDm.find({
          to_id_user: userId,
          round: 1
        });
      } else {
        feedbacks = await PeerEvaluationDm.find({
          to_id_user: userId,
          round: currentRound - 1
        });
      }

      console.log('feedbacks:', feedbacks); // Log the retrieved feedbacks
      return res.json(feedbacks); // Respond with JSON containing feedbacks
    } catch (error) {
      console.error('Error in showFeedbacks:', error); // Log error if any
      return res.status(500).json({ error: 'Internal Server Error' }); // Respond with 500 status and error message
    }
  }

};
