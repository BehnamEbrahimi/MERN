const express = require('express');

const { getAuthorizeUrl, getUserProfile } = require('../services/googleOauth');
const auth = require('../middlewares/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/google', (req, res) => {
  res.redirect(getAuthorizeUrl());
});

router.get('/google/callback', async (req, res) => {
  const profile = await getUserProfile(req.query.code);

  // sign in
  let user = await User.findOne({ googleId: profile.id });
  if (user) {
    const token = await user.generateAuthToken();
    return res.send({ user, token });
  }

  // sign up
  user = await new User({ googleId: profile.id }).save();
  const token = await user.generateAuthToken();
  res.send({ user, token });
});

router.post('/logout', auth, async (req, res) => {
  req.user.tokens = req.user.tokens.filter(token => {
    return token.token !== req.token;
  });
  await req.user.save();

  res.send('Logged out successfully.');
});

router.get('/me', auth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
