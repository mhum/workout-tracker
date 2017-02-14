import { calculateEachSide } from '../../utils/Weights';

const SideRow = ({ workout, workoutLift, cellColor }) => {
  const repMax = workout.repmax;

  return (
    <tr>
      <td />
      <td className="info">{calculateEachSide(repMax, workoutLift.wu1_offset)}</td>
      <td className="info">{calculateEachSide(repMax, workoutLift.wu2_offset)}</td>
      <td className="info">{calculateEachSide(repMax, workoutLift.wu3_offset)}</td>
      <td className={cellColor(workoutLift.l1_reps)}>
        {calculateEachSide(repMax, workoutLift.l1_offset)}
      </td>
      <td className={cellColor(workoutLift.l2_reps)}>
        {calculateEachSide(repMax, workoutLift.l2_offset)}
      </td>
      <td className={cellColor(workoutLift.l3_reps)}>
        {calculateEachSide(repMax, workoutLift.l3_offset)}
      </td>
      <td />
      <td />
    </tr>
  );
};

SideRow.propTypes = {
  workout: React.PropTypes.shape({}).isRequired,
  workoutLift: React.PropTypes.shape({}).isRequired,
  cellColor: React.PropTypes.func.isRequired
};

export default SideRow;
