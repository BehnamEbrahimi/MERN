const express = require('express');

const hiRouter = require('./routes/hi');

const app = express();

app.use(express.json());
app.use('/', hiRouter);

module.exports = app;
