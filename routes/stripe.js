const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const stripeToken = req.body.id;

  await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    description: '$50 for 50 email credits',
    source: stripeToken
  });

  req.user.credits += 50;
  const user = await req.user.save();

  res.send(user);
});

module.exports = router;
