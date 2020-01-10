import backend from '../apis/backend';
import { FETCH_USER, LOGOUT } from './types';

export const fetchUser = () => async dispatch => {
  try {
    const { data: user } = await backend.get('/auth/me');

    dispatch({ type: FETCH_USER, payload: user });
  } catch (ex) {
    dispatch({ type: FETCH_USER, payload: false });
  }
};

export const logout = () => async dispatch => {
  await backend.post('/auth/logout');

  localStorage.removeItem('authToken');

  dispatch({ type: LOGOUT });
};
