const express = require('express');
const authRouter = require('../routes/auth');
const stripeRouter = require('../routes/stripe');
const error = require('../middlewares/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/auth', authRouter);
  app.use('/stripe', stripeRouter);
  app.use(error);
};
