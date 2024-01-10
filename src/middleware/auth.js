const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
      if (!token) {
      throw new Error('Token not provided');
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    if (!decoded) {
      throw new Error('Invalid token');
    }

    const user = await User.findOne({ _id: decoded._id});
    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
