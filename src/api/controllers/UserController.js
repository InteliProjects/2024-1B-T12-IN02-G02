/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  signup: async function (req, res) {
    const { name, email, password, confirmPassword, type = 'Member' } = req.body;

    // Check that the passwords match
    if (password !== confirmPassword) {
      return res.status(400).send({ error: 'Passwords do not match' });
    }
    try {
      // Log to check the data received
      console.log('Received data:', { name, email, password, type });

      // Creates the user with or without a team, depending on the type
      let newUser;
      if (type === 'Member') {
        newUser = await User.create({
          name,
          email,
          password,
          type,
        }).fetch();
      } else if (type === 'Tutor') {
        newUser = await User.create({
          name,
          email,
          password,
          type
        }).fetch();
      } else {
        return res.status(400).send({ error: 'Missing team selection for member' });
      }

      // Return the user created
      console.log('New user created:', newUser);
      req.session.userId = newUser.id;
      req.session.user = newUser;
      return res.status(200).send({ success: true, redirectUrl: '/assessment/self-assessment-collaboration' });
    } catch (error) {
      console.error('Error during signup:', error);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  },

  // The rest of the login code remains unchanged
  login: async function (req, res) {
    const { email, password } = req.body;

    // Check that the email and password are provided
    if (!email || !password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }

    // Find the user by email
    try {
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        console.log('User not found for email:', email);
        return res.status(400).send({ error: 'Invalid email or password' });
      }

      // Check if the password matches
      if (password !== user.password) {
        console.log('Password mismatch for user:', email);
        return res.status(400).send({ error: 'Invalid email or password' });
      }

      // Manage the session
      req.session.userId = user.id;
      req.session.user = user;
      return res.status(200).send({success : true});
    } catch (err) {
      console.error('Error during login:', err);
      return res.status(500).send({ error: 'Error during login' });
    }
  },

  updateHappiness: async function (req, res) {
    try {
      // Obtain the user ID and the happiness meter value from the request
      const userId = req.session.userId;
      const happinessMeter = req.param('happinessMeter');

      // Verifies that the parameters are not empty
      if (!userId || happinessMeter === undefined) {
        return res.status(400).send({ error: 'Missing parameters' });
      }

      // Updates the user's happiness meter
      await User.updateOne({ id: userId }).set({ happinessMeter });

      // Returns a success message
      return res.ok({ message: 'Happiness meter updated successfully' });
    } catch (error) {
      return res.status(500).send({ error: 'Internal server error' });
    }
  },

  logout: async function (req, res) {
    delete req.session.userId;
    delete req.session.user;
    return res.redirect('/');
  }

};
