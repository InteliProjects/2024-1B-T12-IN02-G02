// api/controllers/TeamController.js

// Exporting an object with three controller functions related to team operations
module.exports = {
  
  // Controller function to find members of the user's team asynchronously
  findMembers: async function (req, res) {
    try {
      // Find the current user based on session ID
      const user = await User.findOne({id: req.session.user.id});
      const teamId = user.teamId; // Get the team ID from the user
      const teamMembers = await User.find({ teamId: teamId }); // Find all members of the team
      const team = await Team.findOne({ id: user.teamId }); // Find the team details
      const universe = await Universe.findOne({ id: team.universeId }); // Find the universe details

      // Update session variables with team and universe IDs
      req.session.user.teamId = teamId;
      req.session.user.universeId = universe.id;

      return res.json(teamMembers); // Respond with JSON containing team members
    } catch (error) {
      console.error('Error fetching team members:', error); // Log error if any
      return res.serverError(error); // Respond with a server error status and error details
    }
  },

  // Controller function to calculate team strengths in collaboration asynchronously
  teamStrengthsCollaboration: async function (req, res) {
    console.log('teamStrengthsCollaboration'); // Log function start

    try {
      const teamId = req.session.user.teamId; // Get team ID from session
      const universe = await Universe.findOne({ id: req.session.user.universeId }); // Find universe details
      const currentRound = universe.round; // Get current round from universe

      // Find the team and populate its members
      const team = await Team.findOne({ id: teamId }).populate('members');
      const teamMembers = team.members; // Get team members

      let strengths = []; // Array to store strengths

      // Process strengths if current round is 1
      if(currentRound === 1){
        for(const member of teamMembers) {
          const memberId = member.id; // Get member ID
          const selfAssessmentCollaboration = await PreGameCollaboration.find({ userId: memberId }); // Find collaboration assessments for the member

          if(selfAssessmentCollaboration.length > 0){
            strengths.push(...selfAssessmentCollaboration.map(assessment => assessment.profile));
          } else {
            console.log('No selfAssessmentCollaboration found'); // Log if no collaboration assessments found
          }
        }
      }

      return res.json(strengths); // Respond with JSON containing strengths
    } catch (error) {
      console.error('Error processing team strengths collaboration:', error); // Log error if any
      return res.status(500).json({ error: 'An error occurred while processing the request' }); // Respond with a 500 status and error message
    }
  },

  // Controller function to calculate team strengths in decision making asynchronously
  teamStrengthsDecisionMaking: async function (req, res) {
    console.log('teamStrengthsDecisionMaking'); // Log function start

    try {
      const teamId = req.session.user.teamId; // Get team ID from session
      const universe = await Universe.findOne({ id: req.session.user.universeId }); // Find universe details
      const currentRound = universe.round; // Get current round from universe

      // Find the team and populate its members
      const team = await Team.findOne({ id: teamId }).populate('members');
      const teamMembers = team.members; // Get team members

      let strengths = []; // Array to store strengths

      // Process strengths if current round is 1
      if(currentRound === 1){
        for(const member of teamMembers) {
          const memberId = member.id; // Get member ID
          const selfAssessmentDecisionMaking = await PreGameDm.find({ userId: memberId }); // Find decision making assessments for the member

          if(selfAssessmentDecisionMaking.length > 0){
            strengths.push(...selfAssessmentDecisionMaking.map(assessment => assessment.profileDM));
          } else {
            console.log('No selfAssessmentDecisionMaking found'); // Log if no decision making assessments found
          }
        }
      }

      console.log('Strengths in decision making:', strengths); // Log strengths
      return res.json(strengths); // Respond with JSON containing strengths
    } catch (error) {
      console.error('Error processing team strengths decision making:', error); // Log error if any
      return res.status(500).json({ error: 'An error occurred while processing the request' }); // Respond with a 500 status and error message
    }
  }
};
