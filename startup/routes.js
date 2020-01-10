const express = require('express');
const authRouter = require('../routes/auth');
const stripeRouter = require('../routes/stripe');
const surveysRouter = require('../routes/surveys');
const error = require('../middlewares/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/auth', authRouter);
  app.use('/api/stripe', stripeRouter);
  app.use('/api/surveys', surveysRouter);
  app.use(error);
};
