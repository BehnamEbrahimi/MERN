const mongoose = require('mongoose');

module.exports = function() {
  if (!process.env.MONGO_URI) {
    throw new Error('MongoURI was not supplied.');
  }

  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => console.log('Connected to Mongo db'));
};
