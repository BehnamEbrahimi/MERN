import backend from '../apis/backend';
import { FETCH_USER } from './types';

export const handleStripeToken = stripeToken => async dispatch => {
  const { data: user } = await backend.post('/api/stripe', stripeToken);

  dispatch({ type: FETCH_USER, payload: user });
};
