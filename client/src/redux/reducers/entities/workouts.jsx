import _merge from 'lodash/merge';

import {
  SET_WORKOUTS
} from '../../actions/workout';

export default function workout(state = {}, action) {
  switch (action.type) {

    case SET_WORKOUTS: {
      return _merge({}, state, action.response);
    }

    default:
      return state;
  }
}
