import _merge from 'lodash/merge';

import {
  SET_WORKOUT_TYPES
} from '../../actions/workoutType';

export default function workoutType(state = {}, action) {
  switch (action.type) {

    case SET_WORKOUT_TYPES: {
      return _merge({}, state, action.response);
    }

    default:
      return state;
  }
}
