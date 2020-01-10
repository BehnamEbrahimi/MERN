import backend from '../apis/backend';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const submitSurvey = (values, history) => async dispatch => {
  const { data: user } = await backend.post('/api/surveys', values);

  dispatch({ type: FETCH_USER, payload: user });

  history.push('/surveys');
};

export const fetchSurveys = () => async dispatch => {
  const { data: surveys } = await backend.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: surveys });
};
