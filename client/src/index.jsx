/* eslint-disable global-require */

import 'babel-polyfill';
import 'whatwg-fetch';

import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { hashHistory } from 'react-router';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

//import reducers from './redux/reducers';
import Root from './components/Root';

//import './less/styles.less';

const store = createStore(
  combineReducers({
//    reducers,
    routing: routerReducer
  }),
  applyMiddleware(
    thunkMiddleware
  )
);

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>
, document.getElementById('main'));

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <Root /> here rather than require() a <NextRoot />.
    const NextRoot = require('./components/Root').default;
    ReactDOM.render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>
    , document.getElementById('main'));
  });
}
