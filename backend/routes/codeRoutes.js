const express = require('express');
const { analyzeCode } = require('../controllers/codeController');

const router = express.Router();

// POST route to handle code submission and storage
router.post('/submit', analyzeCode);

module.exports = router;
