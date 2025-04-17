const express = require('express');
const { createReview, getAllReviews } = require('../controllers/reviewController');
const authenticateUser = require('../middleware/authenticateUser');

const router = express.Router();

// Route to create a review (protected)
// The user must be authenticated before creating a review
router.post('/reviews', authenticateUser, createReview);

// Route to get all reviews for the logged-in user (protected)
// The user must be authenticated to fetch their reviews
router.get('/reviews', authenticateUser, getAllReviews);

module.exports = router;
