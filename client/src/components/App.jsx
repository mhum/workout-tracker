import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';


class App extends React.Component {

  render() {
    return (
      <Grid id="container">
        {
          React.cloneElement(this.props.children)
        }
      </Grid>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.shape({}).isRequired,
};

App.defaultProps = {

};

const mapStateToProps = state => (
  {

  }
);

const mapDispatchToProps = dispatch => (
  {

  }
);

const ReduxApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ReduxApp;
