const express = require('express');
const router = express.Router();
const codeAnalysisController = require('../controllers/codeAnalysisController');
const authenticateUser = require('../middleware/authenticateUser');

// Save analysis result (authenticated)
router.post('/save', authenticateUser, codeAnalysisController.saveAnalysisResult);

// Fetch analysis results for the authenticated user
router.get('/results', authenticateUser, codeAnalysisController.getUserResults);

module.exports = router;
