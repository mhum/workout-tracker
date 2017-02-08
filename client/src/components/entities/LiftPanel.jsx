import { connect } from 'react-redux';

import { Panel, Table } from 'react-bootstrap';

import Lift from './Lift';

const LiftPanel = ({ lift, entities }) => {
  const workout = entities.workouts[lift.workout_id];
  const cycle = entities.cycles[workout.cycle_id];
  const workoutLift = entities.workoutLifts[lift.workout_lift_id];
  const workoutType = entities.workoutTypes[workout.workout_type_id];

  const panelTitle = (
    <h3>Lift {workoutLift.title} for {workoutType.title} in Cycle #{cycle.number}</h3>
  );

  return (
    <Panel header={panelTitle}>
      <Table responsive bordered>
        <thead>
          <tr>
            <th>#</th><th>WU</th><th>WU</th><th>WU</th><th>L</th>
            <th>L</th><th>L</th><th>Reps</th><th>Completed</th>
          </tr>
        </thead>
        <Lift lift={lift} />
      </Table>
    </Panel>
  );
};

LiftPanel.propTypes = {
  lift: React.PropTypes.shape({}).isRequired,
  entities: React.PropTypes.shape({}).isRequired
};

const mapStateToProps = state => (
  {
    entities: state.reducers.entities
  }
);

export default connect(mapStateToProps, null)(LiftPanel);
