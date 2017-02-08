import _merge from 'lodash/merge';

import {
  SET_CYCLES
} from '../../actions/cycle';

export default function cycles(state = {}, action) {
  switch (action.type) {

    case SET_CYCLES: {
      return _merge({}, state, action.response);
    }

    default:
      return state;
  }
}
