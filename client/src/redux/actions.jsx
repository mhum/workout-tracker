export const FETCH_AUTH = 'FETCH_AUTH';
export const RECEIVE_AUTH = 'RECEIVE_AUTH';

function requestAuth() {
  return { type: FETCH_AUTH };
}

function receiveAuth(response) {
  return { type: RECEIVE_AUTH, response };
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
