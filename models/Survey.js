const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    subject: { type: String, required: true },
    recipients: [
      new mongoose.Schema({
        // sub-document: with defining a new schema, each will have its unique id-> used for embedded one to many relationship. we dont use embedded one-to-many relationship in case taht the size of the document becomes larger than 4mb
        email: { type: String, required: true },
        responded: { type: Boolean, default: false }
      })
    ],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateSent: { type: Date },
    lastResponded: { type: Date }
  },
  {
    timestamps: true
  }
);

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
