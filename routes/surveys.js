const express = require('express');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

const Survey = require('../models/Survey');
const auth = require('../middlewares/auth');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const surveys = await Survey.find({ owner: req.user._id }).select(
    '-recipients' // we dont want to send big blob of recipients
  );

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
  // example req.body:
  // [
  //   {
  //     email: 'behnam_e63@yahoo.com',
  //     event: 'click',
  //     ip: '115.70.55.156',
  //     sg_event_id: 'Alg4-yVkToCDkNgeXmFnRQ',
  //     sg_message_id: 'Dr_7evwJQPGDxWnEjrPPOA.filter0132p1iad2-30461-5E19A785-1F.0',
  //     timestamp: 1578744563,
  //     url: 'http://localhost:3000/api/surveys/5e19a782607b910ed41c3235/yes',
  //     url_offset: { index: 0, type: 'html' },
  //     useragent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36'
  //   }
  // ]
  const p = new Path('/api/surveys/:surveyId/:choice');

  _.chain(req.body)
    .map(({ email, url }) => {
      // console.log(new URL(url).pathname); // /api/surveys/5e19a782607b910ed41c3235/yes
      const match = p.test(new URL(url).pathname); // e.g { surveyId: '5e19a782607b910ed41c3235', choice: 'no' }
      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice };
      }
    })
    .compact() // removes undefined values from the array
    .uniqBy('email', 'surveyId') // removes one of the objects with the same 'email' and 'surveyId'
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne(
        // ATTENTION: survey document is very big (because of all its subdocs) so never try to fetch one document and then update it!
        {
          _id: surveyId,
          recipients: {
            // because recipients is an array, $elemMatch is used to go through all its elements and find this match. so the whole query is find a survey which has a recipient with that condition
            $elemMatch: { email: email, responded: false }
          }
        },
        {
          $inc: { [choice]: 1 }, // ES6 key interpolation
          $set: { 'recipients.$.responded': true }, // $ is lined up with the $elemMatch. the positional $ operator variable, which holds the "matched" position in the array
          lastResponded: new Date()
        }
      ).exec();
    })
    .value();

  res.send({});
});

module.exports = router;
