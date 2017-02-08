import { combineReducers } from 'redux';
import cycles from './reducers/entities/cycles';
import lifts from './reducers/entities/lifts';
import session from './reducers/session';
import workouts from './reducers/entities/workouts';
import workoutLifts from './reducers/entities/workoutLifts';
import workoutTypes from './reducers/entities/workoutTypes';

const entities = combineReducers({
  cycles,
  lifts,
  workouts,
  workoutLifts,
  workoutTypes
});

export default combineReducers({
  entities,
  session
});
