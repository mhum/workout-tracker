import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';

import HeaderContainer from './layout/Header';
import { getAuthenticated } from '../redux/actions';

class App extends React.Component {
  componentDidMount() {
    this.props.getAuthenticated();
  }

  render() {
    return (
      <Grid id="container">
        <HeaderContainer
          session={this.props.session.auth}
        />
        {
          React.cloneElement(this.props.children, {
            session: this.props.session
          })
        }
      </Grid>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.shape({}).isRequired,
  session: React.PropTypes.shape({
    auth: React.PropTypes.shape({})
  }).isRequired,
  getAuthenticated: React.PropTypes.func.isRequired
};

const mapStateToProps = state => (
  {
    session: state.reducers.session
  }
);

const mapDispatchToProps = dispatch => (
  {
    getAuthenticated: () => {
      dispatch(getAuthenticated());
    }
  }
);

const ReduxApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ReduxApp;
