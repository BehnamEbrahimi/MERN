import { FETCH_USER, LOGOUT } from '../actions/types';

export default function(state = null, { type, payload }) {
  switch (type) {
    case FETCH_USER:
      return payload || false;
    case LOGOUT:
      return false;
    default:
      return state;
  }
}
