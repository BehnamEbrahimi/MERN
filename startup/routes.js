const express = require('express');
const authRouter = require('../routes/auth');
const error = require('../middlewares/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/auth', authRouter);
  app.use(error);
};
