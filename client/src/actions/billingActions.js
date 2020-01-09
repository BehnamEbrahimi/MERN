import backend from '../apis/backend';
import { FETCH_USER } from './types';

export const handleToken = token => async dispatch => {
  const { data } = await backend.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: data });
};
