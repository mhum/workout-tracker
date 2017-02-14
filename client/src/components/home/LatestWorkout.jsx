import _maxBy from 'lodash/maxBy';
import _values from 'lodash/values';
import _isEmpty from 'lodash/isEmpty';

import { Button, Well } from 'react-bootstrap';
import { connect } from 'react-redux';

import LiftPanel from '../entities/lifts/LiftPanel';

import { requestCycleCreate, requestCycleLatest } from '../../redux/actions/cycle';

class LatestWorkout extends React.Component {

  componentDidMount() {
    this.props.requestCycleLatest();
  }

  getNextLift() {
    const cycles = this.props.entities.cycles;
    const workouts = this.props.entities.workouts;
    const lifts = this.props.entities.lifts;

    const lastCycle = _maxBy(_values(cycles), 'id');
    if (!lastCycle || Object.keys(workouts).length < 1 || Object.keys(lifts).length < 1) {
      return {};
    }

    let lift;
    let liftCounter = 0;
    while (liftCounter < 4 && !lift) {
      for (let i = 0; i < lastCycle.workouts.length; i += 1) {
        const w = lastCycle.workouts[i];
        const liftId = workouts[w].lifts[liftCounter];
        const reps = lifts[liftId].reps_completed;

        if (!reps) {
          lift = lifts[liftId];
          break;
        }
      }
      liftCounter += 1;
    }

    return lift;
  }

  render() {
    const cycles = this.props.entities.cycles;
    const numCycles = Object.keys(cycles).length;
    let nextLift;
    if (numCycles > 0) {
      nextLift = this.getNextLift();
    }

    return (
      <div>
        {numCycles < 1 &&
          <Well>
            <p>{"You haven't created any cycles yet. Begin by creating one!"}</p>
            <Button bsStyle="success" onClick={this.props.requestCycleCreate}>
              Create First Cycle
            </Button>
          </Well>
        }

        {!_isEmpty(nextLift) &&
          <LiftPanel lift={nextLift} />
        }
      </div>
    );
  }
}

LatestWorkout.propTypes = {
  requestCycleLatest: React.PropTypes.func.isRequired,
  requestCycleCreate: React.PropTypes.func.isRequired,
  entities: React.PropTypes.shape({
    cycles: React.PropTypes.shape({}),
    lifts: React.PropTypes.shape({}),
    workouts: React.PropTypes.shape({})
  }).isRequired
};

const mapStateToProps = state => (
  {
    entities: state.reducers.entities
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
