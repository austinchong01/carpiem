const { verifyToken, extractTokenFromHeader } = require('../utils/jwt');
const { findUser } = require('../controllers/user');

/**
 * Middleware to authenticate JWT tokens
 * Adds user object to req.user if token is valid
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access token required'
      });
    }

    // Verify the token
    const decoded = verifyToken(token);
    
    // Optionally verify user still exists in database
    try {
      const user = await findUser(decoded.email);
      req.user = {
        id: user.id,
        username: user.username,
        email: user.email
      };
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }

    next();
  } catch (error) {
    console.error('JWT Authentication Error:', error.message);
    
    return res.status(401).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  authenticateToken
};