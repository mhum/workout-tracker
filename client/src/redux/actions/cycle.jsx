import { normalize } from 'normalizr';

import requestEndpoint from '../helpers/request';
import { cycleListSchema } from '../helpers/schema';
import { setLifts } from '../actions/lift';
import { setWorkouts } from '../actions/workout';
import { setWorkoutLifts } from '../actions/workoutLift';
import { setWorkoutTypes } from '../actions/workoutType';

export const SEND_CYCLES_LATEST = 'SEND_CYCLES_LATEST';
export const RECEIVE_CYCLES_LATEST = 'RECEIVE_CYCLES_LATEST';
export const SEND_CYCLE_CREATE = 'SEND_CYCLE_CREATE';
export const RECEIVE_CYCLE_CREATE = 'RECEIVE_CYCLE_CREATE';
export const SET_CYCLES = 'SET_CYCLES';

function sendCycleLatest() {
  return { type: SEND_CYCLES_LATEST };
}

function receiveCycleLatest() {
  return { type: RECEIVE_CYCLES_LATEST };
}

function sendCycleCreate() {
  return { type: SEND_CYCLE_CREATE };
}

function receiveCycleCreate(response) {
  return { type: RECEIVE_CYCLE_CREATE, response };
}

function setCycles(response) {
  return { type: SET_CYCLES, response };
}

export function requestCycleLatest() {
  return (dispatch) => {
    //dispatch(sendCycleLatest());

    requestEndpoint('cycles/latest')
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((json) => {
          const normalizedData = normalize(json.cycles, cycleListSchema);
          //dispatch(receiveCycleLatest());
          dispatch(setCycles(normalizedData.entities.cycles));
          dispatch(setLifts(normalizedData.entities.lifts));
          dispatch(setWorkoutTypes(normalizedData.entities.workoutTypes));
          dispatch(setWorkoutLifts(normalizedData.entities.workoutLifts));
          dispatch(setWorkouts(normalizedData.entities.workouts));
        });
      }
    });
  };
}

export function requestCycleCreate() {
  return (dispatch) => {
    dispatch(sendCycleCreate());

    requestEndpoint('cycles', true, 'POST')
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((json) => {
          dispatch(receiveCycleCreate(json));
        });
      }
    });
  };
}
