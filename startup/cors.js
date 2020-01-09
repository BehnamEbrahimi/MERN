const cors = require('cors');

// in the current app, cors is not an issue because in the development, we used proxy so the browser only deals with localhost:3000 and in the production, the app is served as a static index.html. so no cross origin in both cases. but becase we want to accept different clients from different servers. we used cors.
module.exports = function(app) {
  app.use(cors());
};
