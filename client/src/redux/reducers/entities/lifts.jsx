import _merge from 'lodash/merge';

import {
  SET_LIFTS
} from '../../actions/lift';

export default function lift(state = {}, action) {
  switch (action.type) {

    case SET_LIFTS: {
      return _merge({}, state, action.response);
    }

    default:
      return state;
  }
}
