import { push } from 'react-router-redux';

export const FETCH_AUTH = 'FETCH_AUTH';
export const RECEIVE_AUTH = 'RECEIVE_AUTH';
export const UPDATE_SIGNIN_FIELD = 'UPDATE_SIGNIN_FIELD';
export const UPDATE_SIGNIN_FIELDS = 'UPDATE_SIGNIN_FIELDS';
export const SEND_SIGNIN = 'SEND_SIGNIN';
export const RECEIVE_SIGNIN = 'RECEIVE_SIGNIN';

function requestAuth() {
  return { type: FETCH_AUTH };
}

function receiveAuth(response) {
  return { type: RECEIVE_AUTH, response };
}

function requestSignIn(details) {
  return { type: SEND_SIGNIN, details };
}

function receiveSignIn(response) {
  return { type: RECEIVE_SIGNIN, response };
}

export function getAuthenticated() {
  return (dispatch) => {
    dispatch(requestAuth());
    return fetch('/api/auth',
      {
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(json => dispatch(receiveAuth(json)));
  };
}

export function updateSignInField(name, value) {
  return { type: UPDATE_SIGNIN_FIELD, name, value };
}

export function updateSignInFields(fields) {
  return { type: UPDATE_SIGNIN_FIELDS, fields };
}

export function submitSignIn(details) {
  return (dispatch) => {
    dispatch(requestSignIn(details));
    fetch('/api/auth', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(details)
    })
    .then(response => response.json())
    .then((response) => {
      dispatch(receiveSignIn(response));
      if (response.result) {
        dispatch(push('/'));
      }
    });
  };
}
