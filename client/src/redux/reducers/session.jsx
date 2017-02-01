import _find from 'lodash/find';
import _merge from 'lodash/merge';

import { FETCH_AUTH, RECEIVE_AUTH, UPDATE_SIGNIN_FIELD, UPDATE_SIGNIN_FIELDS, SEND_SIGNIN, RECEIVE_SIGNIN } from '../actions';

const initialState = {
  auth: {
    fetching: true,
    loggedIn: false,
    sessionToken: ''
  },
  signIn: {
    isLoading: false,
    showSuccess: false,
    showError: false,
    errorMsg: '',
    fields: [
      {
        name: 'email',
        value: '',
        valid: true,
        errorMsg: ''
      },
      {
        name: 'password',
        value: '',
        valid: true,
        errorMsg: ''
      }
    ]
  }
};

export default function session(state = initialState, action) {
  switch (action.type) {
    case FETCH_AUTH:
      return _merge({}, state, {
        auth: {
          fetching: true
        }
      });
    case RECEIVE_AUTH:
      return _merge({}, state, {
        auth: {
          loggedIn: action.response.result,
          fetching: false
        }
      });
    case UPDATE_SIGNIN_FIELD: {
      const tempState = Object.assign({}, state);
      const field = _find(tempState.signIn.fields, { name: action.name });
      field.value = action.value;

      return _merge({}, state, tempState);
    }
    case UPDATE_SIGNIN_FIELDS: {
      const tempState = Object.assign({}, state);
      const fields = tempState.signIn.fields;
      tempState.fields = _merge(fields, action.fields);

      return _merge({}, state, tempState);
    }

    case SEND_SIGNIN:
      return _merge({}, state, {
        signIn: {
          isLoading: true
        }
      });
    case RECEIVE_SIGNIN:
      if (action.response.result) {
        const tempState = Object.assign({}, state);
        const fields = tempState.signIn.fields;

        fields.forEach((field) => {
          field.value = '';
          field.valid = true;
          field.errorMsg = '';
        });

        return _merge({}, state, {
          auth: {
            loggedIn: true,
            sessionToken: action.response.token
          },
          signIn: {
            isLoading: false,
            showSuccess: true,
            showError: false
          }
        });
      }

      return _merge({}, state, {
        signIn: {
          isLoading: false,
          showError: true,
          errorMsg: action.response.msg
        }
      });
    default:
      return state;
  }
}
