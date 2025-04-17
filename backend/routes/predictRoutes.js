const express = require('express');
const { predictVulnerability } = require('../controllers/predictController');

const router = express.Router();

// POST route to analyze and predict code vulnerability
router.post('/analyze', predictVulnerability);

module.exports = router;
