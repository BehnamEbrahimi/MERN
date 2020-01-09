const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const authToken = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.authToken': authToken
    });

    if (!user) {
      throw new Error();
    }

    req.authToken = authToken;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
