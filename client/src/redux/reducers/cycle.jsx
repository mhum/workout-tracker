import _merge from 'lodash/merge';

import { SEND_CYCLES_LATEST, RECEIVE_CYCLES_LATEST } from '../actions/cycle';

const initialState = {
  fetching: false,
  cycles: []
};

export default function session(state = initialState, action) {
  switch (action.type) {

    case SEND_CYCLES_LATEST: {
      return _merge({}, state, {
        fetching: true
      });
    }

    case RECEIVE_CYCLES_LATEST: {
      const cycles = action.response;

      return _merge({}, state, {
        fetching: false,
        cycles
      });
    }

    default:
      return state;
  }
}
