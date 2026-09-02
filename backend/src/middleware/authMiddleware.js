const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1. Protect routes (Verify JWT)
const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with "Bearer "
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // Verify token using the secret key in your .env file
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from the database and attach it to the request object
      // .select('-password') ensures the hashed password isn't accidentally exposed
      req.user = await User.findById(decoded.id).select('-password');

      // Move to the next middleware or controller
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed or expired' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// 2. Admin role authorization
const admin = (req, res, next) => {
  // Check if a user is attached to the request (via protect) AND has the admin flag
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: You must be an administrator' });
  }
};

module.exports = { protect, admin };