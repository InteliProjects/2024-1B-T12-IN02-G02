// api/controllers/UploadController.js

// Importing cloudinary module for image upload
const cloudinary = require('cloudinary').v2;

// Exporting controller method
module.exports = {
  // Method to handle image upload
  uploadImage: async function(req, res) {
    // Checking if image file is present in request
    if (!req.file('image')) {
      return res.badRequest('No image file was uploaded');
    }

    // Uploading image file
    req.file('image').upload(async (err, uploadedFiles) => {
      // Handling upload errors
      if (err) {
        return res.serverError(err);
      }

      // Checking if files were uploaded
      if (uploadedFiles.length === 0) {
        return res.badRequest('No file was uploaded');
      }

      try {
        // Uploading image to cloudinary
        const result = await cloudinary.uploader.upload(uploadedFiles[0].fd);
        // Getting secure URL of the uploaded image
        const imageUrl = result.secure_url;

        // Returning success response with image URL
        return res.json({
          message: 'Image uploaded successfully!',
          imageUrl: imageUrl
        });
      } catch (uploadErr) {
        // Handling upload errors
        return res.serverError(uploadErr);
      }
    });
  }
};
