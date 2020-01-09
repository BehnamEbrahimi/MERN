const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/cors')(app);
require('./startup/routes')(app);
require('./startup/db')();

module.exports = app;
