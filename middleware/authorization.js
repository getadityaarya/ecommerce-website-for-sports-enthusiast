const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require('../config/config.js')

function decodeEmailFromToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    if (!decoded.email) {
      return res.status(401).json({ message: 'Email not found in token' });
    }

    req.body.email = decoded.email;

    next();
  });
}

module.exports = decodeEmailFromToken;
