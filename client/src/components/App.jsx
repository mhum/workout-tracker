import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';

import HeaderContainer from './layout/Header';

const App = ({ dispatch, session, children }) => (
  <Grid id="container">
    <HeaderContainer
      session={session.auth}
      dispatch={dispatch}
    />
    {
      React.cloneElement(children, {
        session,
        dispatch
      })
    }
  </Grid>
);

App.propTypes = {
  children: React.PropTypes.shape({}).isRequired,
  dispatch: React.PropTypes.func.isRequired,
  session: React.PropTypes.shape({
    auth: React.PropTypes.shape({})
  }).isRequired
};

const mapStateToProps = state => (
  {
    session: state.reducers.session
  }
);

const ReduxApp = connect(
  mapStateToProps,
  null
)(App);

export default ReduxApp;
