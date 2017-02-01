import 'babel-polyfill';
import 'whatwg-fetch';

import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import App from './App';
import Home from './home/Home';
import SignIn from './session/SignIn';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="signin" component={SignIn} />
      </Route>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: React.PropTypes.shape({}).isRequired,
  history: React.PropTypes.shape({}).isRequired
};

export default Root;
