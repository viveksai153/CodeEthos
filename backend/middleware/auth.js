const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = (req, res, next) => {
  // Check if token exists in the custom header 'token'
  const token = req.header('token');  // Look for 'token' header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Ensure you use the correct secret
    req.user = decoded;  // Attach user info to the request object
    next();  // Proceed to the next middleware/route handler
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticate;
