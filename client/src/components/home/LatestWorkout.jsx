import { Button, Well } from 'react-bootstrap';
import { connect } from 'react-redux';

import { requestCycleCreate, requestCycleLatest } from '../../redux/actions/cycle';

class LatestWorkout extends React.Component {

  componentDidMount() {
    this.props.requestCycleLatest();
  }

  render() {
    const cycles = this.props.cycle.cycles;
    return (
      <div>
        {cycles.length < 1 ? (
          <Well>
            <p>{"You haven't created any cycles yet. Begin by creating one!"}</p>
            <Button bsStyle="success" onClick={this.props.requestCycleCreate}>
              Create First Cycle
            </Button>
          </Well>
        ) : (
          <div> Here </div>
        )}
      </div>
    );
  }
}

LatestWorkout.propTypes = {
  requestCycleLatest: React.PropTypes.func.isRequired,
  requestCycleCreate: React.PropTypes.func.isRequired,
  cycle: React.PropTypes.shape({
    cycles: React.PropTypes.arrayOf(React.PropTypes.shape({}))
  }).isRequired
};

const mapStateToProps = state => (
  {
    cycle: state.reducers.cycle
  }
);

const mapDispatchToProps = dispatch => (
  {
    requestCycleLatest: () => {
      dispatch(requestCycleLatest());
    },
    requestCycleCreate: () => {
      dispatch(requestCycleCreate());
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(LatestWorkout);
