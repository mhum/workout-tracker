import { combineReducers } from 'redux';
import cycle from './reducers/cycle';
import session from './reducers/session';

export default combineReducers({
  cycle,
  session
});
