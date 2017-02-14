import { normalize } from 'normalizr';

import requestEndpoint from '../helpers/request';
import { cycleListSchema } from '../helpers/schema';
import { setLifts } from '../actions/lift';
import { setWorkouts } from '../actions/workout';
import { setWorkoutLifts } from '../actions/workoutLift';
import { setWorkoutTypes } from '../actions/workoutType';

export const SEND_CYCLE_CREATE = 'SEND_CYCLE_CREATE';
export const RECEIVE_CYCLE_CREATE = 'RECEIVE_CYCLE_CREATE';
export const SET_CYCLES = 'SET_CYCLES';

function sendCycleCreate() {
  return { type: SEND_CYCLE_CREATE };
}

function receiveCycleCreate(response) {
  return { type: RECEIVE_CYCLE_CREATE, response };
}

function setCycles(response) {
  return { type: SET_CYCLES, response };
}

function updateEntities(dispatch, entities) {
  dispatch(setCycles(entities.cycles));
  dispatch(setLifts(entities.lifts));
  dispatch(setWorkoutTypes(entities.workoutTypes));
  dispatch(setWorkoutLifts(entities.workoutLifts));
  dispatch(setWorkouts(entities.workouts));
}

export function requestCycles() {
  return (dispatch) => {
    requestEndpoint('cycles')
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((json) => {
          const normalizedData = normalize(json.cycles, cycleListSchema);
          updateEntities(dispatch, normalizedData.entities);
        });
      }
    });
  };
}

export function requestCycleLatest() {
  return (dispatch) => {
    requestEndpoint('cycles/latest')
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((json) => {
          const normalizedData = normalize(json.cycles, cycleListSchema);
          updateEntities(dispatch, normalizedData.entities);
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
