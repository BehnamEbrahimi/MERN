const path = require('path');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/cors')(app);
require('./startup/routes')(app);
require('./startup/db')();

if (process.env.NODE_ENV === 'production') {
  // express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // express will serve up the index.html file
  // if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
