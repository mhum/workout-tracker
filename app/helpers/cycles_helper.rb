module CyclesHelper
  
  def calc_orm(lift)
    if (lift.reps_completed == nil)
      return
    end
    max_weight_lifted = calculate_weight(lift.workout.working_max, lift.workout_lift.l3_offset)
    reps_completed = lift.reps_completed
    
    orm = max_weight_lifted*(1+(reps_completed.to_f/30))
    orm.round
  end
end
