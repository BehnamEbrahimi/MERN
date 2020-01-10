import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleStripeToken } from '../actions/billingActions';

const Payments = ({ handleStripeToken }) => {
  return (
    <StripeCheckout
      name="Survey Sender"
      description="$50 for 50 email credits"
      amount={5000}
      token={stripeToken => handleStripeToken(stripeToken)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}>
      <button className="btn">Add Credits</button>
    </StripeCheckout>
  );
};

export default connect(null, { handleStripeToken })(Payments);
