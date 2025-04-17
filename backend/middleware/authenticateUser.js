const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticateUser = (req, res, next) => {
  // Extract token from the header
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. No token provided.' });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Log the decoded token for debugging
    console.log('Decoded token:', decoded);
    
    // Attach the decoded token to req.user
    req.user = decoded;
    
    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};

module.exports = authenticateUser;
