import _find from 'lodash/find';
import _merge from 'lodash/merge';

import { UPDATE_SIGNIN_FIELD, UPDATE_SIGNIN_FIELDS, SEND_SIGNIN,
  SIGNIN_SUCCESS, SIGNIN_FAILURE, SEND_SINGOUT, SIGNOUT_SUCCESS } from '../actions/session';

const initialState = {
  auth: {
    fetching: true,
    loggedIn: localStorage.getItem('id_token') !== null,
    auth_token: localStorage.getItem('id_token'),
    email: null
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

    case SIGNIN_SUCCESS: {
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
          auth_token: action.response.auth_token,
          email: action.response.user.email
        },
        signIn: {
          isLoading: false,
          showSuccess: true,
          showError: false
        }
      });
    }

    case SIGNIN_FAILURE:
      return _merge({}, state, {
        signIn: {
          isLoading: false,
          showError: true,
          errorMsg: action.response.errors[0]
        }
      });

    case SEND_SINGOUT:
      return _merge({}, state, {
        signIn: {
          isLoading: true
        }
      });

    case SIGNOUT_SUCCESS:
      return _merge({}, state, {
        auth: {
          loggedIn: false,
          auth_token: null,
          email: null
        },
        signIn: {
          isLoading: false
        }
      });
    default:
      return state;
  }
}
