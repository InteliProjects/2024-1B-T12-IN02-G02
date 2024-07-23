// api/controllers/StatusController.js

// Exporting an object with two controller functions: changeStatus and getStatus
module.exports = {
  
  // Controller function to change user status asynchronously
  changeStatus: async function(req, res) {
    console.log('changeStatus'); // Log to console indicating function start
    const userId = req.session.userId; // Extract userId from session
    const newStatus = req.body.status; // Extract new status from request body

    // Log the request to change user status
    console.log(`Request to change user ${userId}'s status to ${newStatus}`);

    // Validate if the new status is either 'ONLINE' or 'OFFLINE'
    if (!['ONLINE', 'OFFLINE'].includes(newStatus)) {
      console.error('Invalid status:', newStatus); // Log error if status is invalid
      return res.badRequest({ error: 'Invalid status. Use ONLINE or OFFLINE.' }); // Respond with a bad request status and error message
    }

    // Update the user's status in the database
    const updatedUser = await User.updateOne({ id: userId }).set({ status: newStatus });

    // If no user was updated (user not found), log an error and respond with not found status
    if (!updatedUser) {
      console.error('User not found:', userId);
      return res.notFound({ error: 'User not found.' });
    }

    // Update the status in the session object
    req.session.user.status = updatedUser.status;
    console.log(req.session.user.status); // Log the updated status in the session
    console.log('User status updated successfully:', updatedUser.status); // Log success message with the updated status
    return res.json(updatedUser); // Respond with JSON containing the updated user object
  },

  // Controller function to get user status asynchronously
  getStatus: async function(req, res) {
    const userId = req.params.id; // Extract userId from request parameters

    // Log the request to get user status
    console.log(`Request to get status of user ${userId}`);

    // Find the user in the database based on userId
    const user = await User.findOne({ id: userId });

    // If no user found, log an error and respond with not found status
    if (!user) {
      console.error('User not found:', userId);
      return res.notFound({ error: 'User not found.' });
    }

    // Log the user's status and respond with JSON containing the status
    console.log('User status:', user.status);
    return res.json({ status: user.status });
  }
};
