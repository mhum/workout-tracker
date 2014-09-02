class CyclesController < ApplicationController
  include SessionsHelper
  
  def index
    @cycles = current_user.cycles.all
  end
  
  def create
    number = 1
    last_cycle = current_user.cycles.last
    if (last_cycle)
      number = last_cycle.number + 1
    end
    cycle = current_user.cycles.create(number:number)
    
    WorkoutType.where(active:true).each do |workoutType|
       workout = cycle.workouts.create(workout_type: workoutType)
       WorkoutType.includes(:workout_lifts).find(workoutType.id).workout_lifts.each do |workoutLift|
         workout.lifts.create(workout_lift:workoutLift)     
       end
    end
    
    redirect_to user_path(current_user)
  end
  
  def show
    @cycle = Cycle.find(params[:id])
  end
  
  def destroy
    cycles.find(params[:id]).destroy
    redirect_to user_path(current_user)
  end

end
