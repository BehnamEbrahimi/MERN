const express = require('express');
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');

const Survey = require('../models/Survey');
const auth = require('../middlewares/auth');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const surveys = await Survey.find({ owner: req.user._id }).select({
    recipients: false
  });

  res.send(surveys);
});

router.post('/', auth, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({ email: email.trim() })),
    owner: req.user._id,
    dateSent: Date.now()
  });

  // instanciate a mailer object
  const mailer = new Mailer(survey, surveyTemplate(survey));

  try {
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
});

router.get('/:surveyId/:choice', (req, res) => {
  res.send('Thanks for voting!');
});

router.post('/webhooks', (req, res) => {
  const p = new Path('/:surveyId/:choice');

  _.chain(req.body)
    .map(({ email, url }) => {
      const match = p.test(new URL(url).pathname);
      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice };
      }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }
      ).exec();
    })
    .value();

  res.send({});
});

module.exports = router;
