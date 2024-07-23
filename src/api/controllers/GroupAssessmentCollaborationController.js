/* eslint-disable camelcase */
// api/controllers/GroupAssessmentCollaborationController.js

module.exports = {
  // Function to create a group assessment
  create: async function (req, res) {
    try {
      // Validate input - check if 'evaluations' field is present and it is an array
      if (!req.body.evaluations || !Array.isArray(req.body.evaluations)) {
        return res.badRequest('Evaluations field is required and must be an array.');
      }

      // Obtain user ID from session
      const from_id_user = req.session.userId;

      // Find the team associated with the user
      const team = await Team.findOne({ id: req.session.user.teamId }).populate('universeId');
      if (!team) {
        return res.json({ error: 'Team not found' });
      }

      // Find the universe associated with the team
      const universe = team.universeId;
      if (!universe) {
        return res.json({ error: 'Universe not found for the team' });
      }

      // Get the round from the universe
      const round = universe.round;
      if (typeof round === 'undefined') {
        return res.json({ error: 'Round not found in the universe' });
      }

      console.log('round', round);

      // Create evaluations based on the provided data
      const evaluations = req.body.evaluations.map(evaluation => ({
        from_id_user,
        to_id_user: evaluation.to_id_user,
        round: round,
        type: evaluation.type,
        answer: evaluation.answer
      }));

      // Save the evaluations to the database
      const createdEvaluations = await PeerEvaluationCollaboration.createEach(evaluations).fetch();
      console.log('Created Evaluations:', createdEvaluations);

      // Return success message
      return res.json({ message: 'Evaluations submitted successfully!', data: createdEvaluations });
    } catch (error) {
      console.error('Error sending evaluations:', error);
      return res.status(500).json({ error: 'Error sending evaluations' });
    }
  }
};
