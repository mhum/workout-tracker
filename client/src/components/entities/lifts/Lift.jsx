import { connect } from 'react-redux';

import TotalRow from './TotalRow';
import SideRow from './SideRow';

const cellColor = (reps) => {
  if (reps === 5) {
    return 'success';
  } else if (reps === 3) {
    return 'warning';
  } else if (reps === 1) {
    return 'danger';
  }

  return '';
};

const Lift = ({ lift, entities }) => {
  const workout = entities.workouts[lift.workout_id];
  const workoutLift = entities.workoutLifts[lift.workout_lift_id];

  return (
    <tbody>
      <TotalRow
        lift={lift}
        workout={workout}
        workoutLift={workoutLift}
        cellColor={cellColor}
      />
      <SideRow
        workout={workout}
        workoutLift={workoutLift}
        cellColor={cellColor}
      />
    </tbody>
  );
};

Lift.propTypes = {
  lift: React.PropTypes.shape({}).isRequired,
  entities: React.PropTypes.shape({}).isRequired
};

const mapStateToProps = state => (
  {
    entities: state.reducers.entities
  }
);

export default connect(mapStateToProps, null)(Lift);
