// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateUser = require('../middleware/authenticateUser');

// Register Route
router.post('/register', authController.register);

// Login Route
router.post('/login', authController.login);

router.get('/me',authenticateUser,authController.getCurrentUser);

module.exports = router;
