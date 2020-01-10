const express = require('express');

const {
  getAuthorizeUrl,
  getUserProfileAndGoogleToken,
  logout
} = require('../services/googleOauth');
const auth = require('../middlewares/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/google', (req, res) => {
  res.redirect(getAuthorizeUrl());
});

router.get('/google/callback', async (req, res) => {
  const { profile, googleToken } = await getUserProfileAndGoogleToken(
    req.query.code
  );

  // sign in
  let user = await User.findOne({ googleId: profile.id });
  if (user) {
    const authToken = await user.generateAuthToken(googleToken);
    return res.redirect(
      `${process.env.APP_URL}/surveys/?authToken=${authToken}`
    );
  }

  // sign up
  user = await new User({ googleId: profile.id }).save();
  const authToken = await user.generateAuthToken(googleToken);
  return res.redirect(`${process.env.APP_URL}/surveys/?authToken=${authToken}`);
});

router.post('/logout', auth, async (req, res) => {
  const { googleToken } = req.user.tokens.find(
    token => token.authToken === req.authToken
  );

  req.user.tokens = req.user.tokens.filter(token => {
    return token.authToken !== req.authToken;
  });
  await req.user.save();

  logout(googleToken);

  res.send('Logged out successfully.');
});

router.get('/me', auth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
