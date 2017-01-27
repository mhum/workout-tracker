import _merge from 'lodash/merge';

import { FETCH_AUTH, RECEIVE_AUTH } from '../actions';

const initialState = {
  fetching: true,
  loggedIn: false
};

export default function session(state = initialState, action) {
  switch (action.type) {
    case FETCH_AUTH:
      return _merge({}, state, {
        fetching: true
      });
    case RECEIVE_AUTH:
      return _merge({}, state, {
        loggedIn: action.response.result,
        fetching: false
      });
    default:
      return state;
  }
}
