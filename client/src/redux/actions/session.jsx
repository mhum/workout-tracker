import { push } from 'react-router-redux';

export const UPDATE_SIGNIN_FIELD = 'UPDATE_SIGNIN_FIELD';
export const UPDATE_SIGNIN_FIELDS = 'UPDATE_SIGNIN_FIELDS';
export const SEND_SIGNIN = 'SEND_SIGNIN';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const SEND_SINGOUT = 'SEND_SINGOUT';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';

function requestSignIn(details) {
  return { type: SEND_SIGNIN, details };
}

function signInSuccess(response) {
  return { type: SIGNIN_SUCCESS, response };
}

function signInFailure(response) {
  return { type: SIGNIN_FAILURE, response };
}

function requestSignOut() {
  return { type: SEND_SINGOUT };
}

function signOutSuccess() {
  return { type: SIGNOUT_SUCCESS };
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
      method: 'POST',
      body: JSON.stringify(details)
    })
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((json) => {
          localStorage.setItem('id_token', json.auth_token);
          dispatch(signInSuccess(json));
          dispatch(push('/'));
        });
      } else {
        response.json()
        .then((json) => {
          dispatch(signInFailure(json));
        });
      }
    });
  };
}

export function submitSignOut() {
  return (dispatch) => {
    dispatch(requestSignOut());
    localStorage.removeItem('id_token');
    dispatch(signOutSuccess());
  };
}
