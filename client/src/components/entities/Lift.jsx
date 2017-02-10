import { connect } from 'react-redux';

import TotalRow from './lifts/TotalRow';
import SideRow from './lifts/SideRow';

const calculateWeight = (repMax, percent) => {
  const workingMax = Math.round((repMax * 0.9) / 5) * 5;

  if (percent) {
    return Math.round((workingMax * percent) / 5) * 5;
  }
  return 0;
};

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
        calculateWeight={calculateWeight}
        cellColor={cellColor}
      />
      <SideRow
        workout={workout}
        workoutLift={workoutLift}
        calculateWeight={calculateWeight}
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