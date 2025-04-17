// routes/code.js
const express = require('express');
const { analyzeAndSaveCode } = require('../controllers/codeController');

const router = express.Router();

// POST /api/ml/predict - Route to analyze code and save the result
router.post('/ml/predict', analyzeAndSaveCode);

module.exports = router;
