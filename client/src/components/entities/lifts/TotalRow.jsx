const TotalRow = ({ lift, workout, workoutLift, calculateWeight }) => {
  const repMax = workout.repmax;

  return (
    <tr>
      <td>{workoutLift.title}</td>
      <td>{calculateWeight(repMax, workoutLift.wu1_offset)}</td>
      <td>{calculateWeight(repMax, workoutLift.wu2_offset)}</td>
      <td>{calculateWeight(repMax, workoutLift.wu3_offset)}</td>
      <td>{calculateWeight(repMax, workoutLift.l1_offset)}</td>
      <td>{calculateWeight(repMax, workoutLift.l2_offset)}</td>
      <td>{calculateWeight(repMax, workoutLift.l3_offset)}</td>
      <td>{lift.reps_completed}</td>
      <td>{lift.completed_date}</td>
    </tr>
  );
};

TotalRow.propTypes = {
  lift: React.PropTypes.shape({}).isRequired,
  workout: React.PropTypes.shape({}).isRequired,
  workoutLift: React.PropTypes.shape({}).isRequired,
  calculateWeight: React.PropTypes.func.isRequired
};


export default TotalRow;
