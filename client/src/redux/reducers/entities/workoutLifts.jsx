import _merge from 'lodash/merge';

import {
  SET_WORKOUT_LIFTS
} from '../../actions/workoutLift';

export default function workoutLift(state = {}, action) {
  switch (action.type) {

    case SET_WORKOUT_LIFTS: {
      return _merge({}, state, action.response);
    }

    default:
      return state;
  }
}
