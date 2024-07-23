// api/controllers/OtherProfileController.js
module.exports = {
  /**
   * profile
   * Controller action to render the profile view of another user.
   */
  profile: async function (req, res) {
    const userId = req.query.userId; // Extract userId from query parameters
    if (!userId) {
      return res.status(400).send('User ID is required'); // Return 400 status if userId is missing
    }

    try {
      const user = await User.findOne({ id: userId }); // Find user by userId
      if (!user) {
        return res.status(404).send('User not found'); // Return 404 status if user not found
      }

      return res.view('pages/other-profile', { userId }); // Render the other-profile page with userId
    } catch (error) {
      return res.status(500).send('Server error'); // Return 500 status for server errors
    }
  },

  /**
   * getUser
   * Controller action to get user details by user ID.
   */
  getUser: async function (req, res) {
    const userId = req.params.id; // Extract userId from route parameters
    if (!userId) {
      return res.status(400).send('User ID is required'); // Return 400 status if userId is missing
    }

    try {
      const user = await User.findOne({ id: userId }); // Find user by userId
      if (!user) {
        return res.status(404).send('User not found'); // Return 404 status if user not found
      }

      return res.json(user); // Respond with JSON containing user details
    } catch (error) {
      return res.status(500).send('Server error'); // Return 500 status for server errors
    }
  },

};



