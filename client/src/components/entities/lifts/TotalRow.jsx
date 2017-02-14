import { calculateLiftAmount } from '../../utils/Weights';

const TotalRow = ({ lift, workout, workoutLift, cellColor }) => {
  const repMax = workout.repmax;

  return (
    <tr>
      <td>{workoutLift.title}</td>
      <td className="info">{calculateLiftAmount(repMax, workoutLift.wu1_offset)}</td>
      <td className="info">{calculateLiftAmount(repMax, workoutLift.wu2_offset)}</td>
      <td className="info">{calculateLiftAmount(repMax, workoutLift.wu3_offset)}</td>
      <td className={cellColor(workoutLift.l1_reps)}>
        {calculateLiftAmount(repMax, workoutLift.l1_offset)}
      </td>
      <td className={cellColor(workoutLift.l2_reps)}>
        {calculateLiftAmount(repMax, workoutLift.l2_offset)}
      </td>
      <td className={cellColor(workoutLift.l3_reps)}>
        {calculateLiftAmount(repMax, workoutLift.l3_offset)}
      </td>
      <td>{lift.reps_completed}</td>
      <td>{lift.completed_date}</td>
    </tr>
  );
};

TotalRow.propTypes = {
  lift: React.PropTypes.shape({}).isRequired,
  workout: React.PropTypes.shape({}).isRequired,
  workoutLift: React.PropTypes.shape({}).isRequired,
  cellColor: React.PropTypes.func.isRequired
};


export default TotalRow;
