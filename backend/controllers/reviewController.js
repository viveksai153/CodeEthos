const Review = require('../models/Review');

// Create a new review
const createReview = async (req, res) => {
  try {
    const { fileName, vulnerabilities = 0, codeSmells = 0, bugs = 0 } = req.body;

    // Ensure fileName is provided
    if (!fileName) {
      return res.status(400).json({ message: 'fileName is required.' });
    }

    // Create a new review and associate it with the authenticated user
    const review = new Review({
      user: req.user.userId, // Attach the authenticated user's ID
      fileName,
      vulnerabilities,
      codeSmells,
      bugs,
    });

    // Save the review to the database
    const savedReview = await review.save();

    res.status(201).json({ message: 'Review created successfully.', review: savedReview });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Server error while creating review.' });
  }
};
// Fetch all reviews for the authenticated user
const getAllReviews = async (req, res) => {
  try {
    // Ensure the userId is correctly extracted from req.user
    const reviews = await Review.find({ user: req.user.userId }).populate('user', 'name email');  // Fetch reviews and populate user data

    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this user.' });
    }

    res.json({ message: 'Reviews fetched successfully.', reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error while fetching reviews.' });
  }
};

module.exports = {
  createReview,
  getAllReviews,
};
