// api/controllers/MyProfileController.js

// Importing cloudinary module for image upload
const cloudinary = require('cloudinary').v2;

// Exporting controller methods
module.exports = {

  // Method to render profile form
  showProfileForm: async function (req, res) {
    try {

      // Finding user by session ID
      const user = await User.findOne({ id: req.session.userId });

      // If user not found, return not found response
      if (!user) {
        return res.notFound('User not found');
      }

      // Rendering profile form page with user data
      return res.view('pages/my-profile', { user });
    } catch (error) {

      // If error occurs, return server error response
      return res.serverError(error);
    }
  },

  // Method to update user profile
  updateProfile: async function (req, res) {

    // Destructuring request body
    const { name, email, firstLanguage, gender, pronouns, birthdate, phone, country, university, instagram, facebook, twitter, timeZone } = req.body;

    try {
      // Initializing imageUrl variable
      let imageUrl = null;

      // Checking if profile image is uploaded
      if (req.file('profileImage')) {
        const uploadedFiles = await new Promise((resolve, reject) => {
          req.file('profileImage').upload((err, files) => {
            if (err) {return reject(err);}
            return resolve(files);
          });
        });

        //If files uploaded, uploading image to cloudinary and setting imageUrl
        if (uploadedFiles.length > 0) {
          const result = await cloudinary.uploader.upload(uploadedFiles[0].fd);
          imageUrl = result.secure_url;
        }
      }

      // Updating user profile with new data
      const updatedUser = await User.updateOne({ id: req.session.userId }).set({
        name, email, firstLanguage, gender, pronouns, birthdate, phone, country, university, instagram, facebook, twitter, timeZone,
        profileImage: imageUrl || undefined // Only set profileImage if imageUrl is not null
      });

      // If user not found, return not found response
      if (!updatedUser) {
        return res.notFound('User not found');
      }
      // Redirecting to view personal profile page after successful update

      req.session.user.profileImage = imageUrl;

      return res.redirect('/view-personal-profile');
    } catch (err) {
      // If error occurs, return server error response
      return res.serverError(err);
    }
  },

  // Method to render user profile page
  showUserProfile: async function (req, res) {
    try {
      // Finding user by session ID
      const user = await User.findOne({ id: req.session.userId });
      // If user not found, return not found response
      if (!user) {
        return res.notFound('User not found');
      }
      // Rendering view personal profile page with user data
      return res.view('pages/view-personal-profile', { user });
    } catch (error) {
      // If error occurs, return server error response
      return res.serverError(error);
    }
  },
};
