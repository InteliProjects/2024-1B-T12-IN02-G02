/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
// api/controllers/GroupAssessmentDmController.js

module.exports = {
  // Function to create group assessment
  create: async function(req, res) {
    try {
      // Check if user is logged in
      if (!req.session.userId) {
        return res.forbidden('You need to be logged in to perform this action.');
      }

      // Destructure request body
      const { analytical, conceptual, directive, behavioral } = req.body;

      // Check if all fields are present
      if (!analytical || !conceptual || !directive || !behavioral) {
        return res.badRequest('All fields are mandatory.');
      }

      // Get user id from session
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
      // Array to hold evaluations
      const evaluations = [];

      // Function to create evaluations
      const createEvaluations = (members, answer) => {
        members.forEach(member => {
          evaluations.push({
            from_id_user,
            to_id_user: parseInt(member.id.replace('member', '')),
            round,
            answer
          });
        });
      };

      // Create evaluations for each category
      createEvaluations(JSON.parse(analytical), 'analytical');
      createEvaluations(JSON.parse(conceptual), 'conceptual');
      createEvaluations(JSON.parse(directive), 'directive');
      createEvaluations(JSON.parse(behavioral), 'behavioral');

      // Log evaluations to be created
      sails.log('Evaluations to be created:', evaluations);
      console.log('Evaluations to be created:', evaluations);

      // Save all evaluations to the database
      const createdEvaluations = await PeerEvaluationDm.createEach(evaluations).fetch();

      // Log created evaluations
      sails.log('Created evaluations:', createdEvaluations);
      console.log('Created evaluations:', createdEvaluations);

      // Return success message
      return res.json({ message: 'Assessments submitted successfully!', data: createdEvaluations });
    } catch (error) {
      // Handle error
      sails.log.error('Error creating assessments:', error);
      console.log('Error creating assessments:', error);
      return res.serverError(error);
    }
  }
};
