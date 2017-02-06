export const SEND_CYCLES_LATEST = 'SEND_CYCLES_LATEST';
export const RECEIVE_CYCLES_LATEST = 'RECEIVE_CYCLES_LATEST';

function sendCycleLatest() {
  return { type: SEND_CYCLES_LATEST };
}

function receiveCycleLatest(response) {
  return { type: RECEIVE_CYCLES_LATEST, response };
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
