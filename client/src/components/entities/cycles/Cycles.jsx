import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import { calculateLiftAmount } from '../../utils/Weights';
import { requestCycles } from '../../../redux/actions/cycle';

const getCells = (entities, cycleWorkouts) => {
  const cells = [];
  const workouts = entities.workouts;
  const lifts = entities.lifts;
  const workoutLifts = entities.workoutLifts;
  const workoutTypes = entities.workoutTypes;

  cycleWorkouts.forEach((w) => {
    const workout = workouts[w];
    if (workout) {
      const maxLift = lifts[workout.lifts[workout.lifts.length - 2]];
      const maxWorkoutLift = workoutLifts[maxLift.workout_lift_id];

      const workoutType = workoutTypes[workout.workout_type_id];
      const maxWeight = calculateLiftAmount(workout.repmax, maxWorkoutLift.l3_offset);
      const maxReps = maxLift.reps_completed ? maxLift.reps_completed : 0;

      cells.push(<td key={workoutType.title}>{workoutType.title}</td>);
      cells.push(<td key={`${workoutType.title}-max`}>{maxWeight}</td>);
      cells.push(<td key={`${workoutType.title}-reps`}>{maxReps}</td>);
      cells.push(<td key={`${workoutType.title}-orm`}>{workout.repmax}</td>);
    }
  });

  return cells;
};

class Cycles extends React.Component {

  componentDidMount() {
    this.props.requestCycles();
  }

  render() {
    const entities = this.props.entities;
    const cycles = entities.cycles;

    return (
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Workout</th>
            <th>Max</th>
            <th>Max Reps</th>
            <th>ORM</th>
            <th>Workout</th>
            <th>Max</th>
            <th>Max Reps</th>
            <th>ORM</th>
            <th>Workout</th>
            <th>Max</th>
            <th>Max Reps</th>
            <th>ORM</th>
            <th>Workout</th>
            <th>Max</th>
            <th>Max Reps</th>
            <th>ORM</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(cycles).length > 0 && Object.keys(cycles).map((key) => {
              const cycle = cycles[key];
              const cycleWorkouts = cycle.workouts;
              return (
                <tr key={cycle.id}>
                  <td>{cycle.number}</td>
                  {
                    getCells(entities, cycleWorkouts).map(c => c)
                  }
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    );
  }
}

Cycles.propTypes = {
  entities: React.PropTypes.shape({
    cycles: React.PropTypes.shape({})
  }).isRequired,
  requestCycles: React.PropTypes.func.isRequired
};

const mapStateToProps = state => (
  {
    entities: state.reducers.entities
  }
);

const mapDispatchToProps = dispatch => (
  {
    requestCycles: () => {
      dispatch(requestCycles());
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Cycles);
