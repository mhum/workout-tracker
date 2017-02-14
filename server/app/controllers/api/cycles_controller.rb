class Api::CyclesController < Api::BaseController
  before_action :authenticate_request!

  def index
    cycles = @current_user.cycles
    render json: payload(cycles)
  end

  def latest
    cycle = @current_user.cycles.last
    render json: payload([cycle])
  end

  def create
    logger.info("Create new cycle!")

    workout_types = WorkoutType.where(active:true)

    if (!workout_types)
      flash.now[:danger] = "There are no workout types."
      redirect_to root_path
      return false
    end

    number = 1
    last_cycle = current_user.cycles.last
    if (last_cycle)
      number = last_cycle.number + 1
    end

    last_cycle = current_user.cycles.last

    Cycle.transaction do
      new_cycle = current_user.cycles.create(number:number)
      logger.info("Create new object")
      logger.info("Iterate through workouts")
      workout_types.each do |workoutType|
         logger.info("Start workout iterate")
         repmax = 0
         if(last_cycle)
           last_workout = current_user.cycles[-2].workouts.select {|w| w.workout_type.eql? workoutType}
           repmax = last_workout.first.repmax + workoutType.weight_increase
         end
         workout = new_cycle.workouts.create(workout_type: workoutType, repmax:repmax)
         logger.info("Create new workout! Create lifts")
         WorkoutType.includes(:workout_lifts).find(workoutType.id).workout_lifts.each do |workoutLift|
           workout.lifts.create(workout_lift:workoutLift)
           logger.info("Lift created")
         end
      end
    end

    puts new_cycle
  end

  private

    def payload(cycles)
      {
        cycles: cycles
      }
    end

end
