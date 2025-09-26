const express = require('express');
const { authenticateToken } = require('../controllers/jwt');
const router = express.Router();

// All routes in this file require authentication
router.use(authenticateToken);

// Example protected route
router.get('/profile', (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

module.exports = router;