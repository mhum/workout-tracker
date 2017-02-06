export const SEND_CYCLES_LATEST = 'SEND_CYCLES_LATEST';
export const RECEIVE_CYCLES_LATEST = 'RECEIVE_CYCLES_LATEST';
export const SEND_CYCLE_CREATE = 'SEND_CYCLE_CREATE';
export const RECEIVE_CYCLE_CREATE = 'RECEIVE_CYCLE_CREATE';

function sendCycleLatest() {
  return { type: SEND_CYCLES_LATEST };
}

function receiveCycleLatest(response) {
  return { type: RECEIVE_CYCLES_LATEST, response };
}

function sendCycleCreate() {
  return { type: SEND_CYCLE_CREATE };
}

function receiveCycleCreate(response) {
  return { type: RECEIVE_CYCLE_CREATE, response };
}

export function requestCycleLatest() {
  const token = localStorage.getItem('id_token') || null;
  return (dispatch) => {
    dispatch(sendCycleLatest());
    fetch('/api/cycles/latest', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((json) => {
          dispatch(receiveCycleLatest(json));
        });
      }
    });
  };
}

export function requestCycleCreate() {
  const token = localStorage.getItem('id_token') || null;
  return (dispatch) => {
    dispatch(sendCycleCreate());
    fetch('/api/cycles', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'POST'
    })
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
