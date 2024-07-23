

module.exports = {

  create: async function (req, res) {
    try {
      const userId = req.session.userId;
      const { question1, question2, question3, question4, question5, question6 } = req.body;

      // Check that the user ID is valid and present
      if (!userId || !question1 || !question2 || !question3 || !question4 || !question5 || !question6) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if the user exists in the database
      const existingUser = await User.findOne({ id: userId });
      if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create a new PreGameDm entry
      const newPreGameCollab = await PreGameCollaboration.create({
        userId,
        question1,
        question2,
        question3,
        question4,
        question5,
        question6,
      }).fetch();



      return res.redirect('/assessment/self-assessment-decision-making');
    } catch (error) {
      //return an error
      return res.status(500).json({ error: 'An error occurred while creating the PreGameCollaboration entry' });
    }
  },

};
