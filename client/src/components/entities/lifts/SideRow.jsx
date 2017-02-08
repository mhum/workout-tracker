const eachWeight = (repMax, percent, calculateWeight) => {
  const calculatedWeight = (calculateWeight(repMax, percent) - 45) / 2;

  if (calculatedWeight < 0) {
    return 0;
  }

  return calculatedWeight;
};

const SideRow = ({ workout, workoutLift, calculateWeight }) => {
  const repMax = workout.repmax;

  return (
    <tr>
      <td />
      <td>{eachWeight(repMax, workoutLift.wu1_offset, calculateWeight)}</td>
      <td>{eachWeight(repMax, workoutLift.wu2_offset, calculateWeight)}</td>
      <td>{eachWeight(repMax, workoutLift.wu3_offset, calculateWeight)}</td>
      <td>{eachWeight(repMax, workoutLift.l1_offset, calculateWeight)}</td>
      <td>{eachWeight(repMax, workoutLift.l2_offset, calculateWeight)}</td>
      <td>{eachWeight(repMax, workoutLift.l3_offset, calculateWeight)}</td>
      <td />
      <td />
    </tr>
  );
};

SideRow.propTypes = {
  workout: React.PropTypes.shape({}).isRequired,
  workoutLift: React.PropTypes.shape({}).isRequired,
  calculateWeight: React.PropTypes.func.isRequired
};

export default SideRow;
