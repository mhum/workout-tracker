class CyclesController < ApplicationController
  include SessionsHelper
  
  before_action :signed_in_user, only: [:edit, :update, :show, :index, :destory]
  before_action :correct_user,   only: [:edit, :update, :show, :destory]
  
  add_breadcrumb "Home", :root_path
  
  def index
    add_breadcrumb "Cycles", cycles_path
        
    @cycles = current_user.cycles.all
  end
  
  def create
    logger.info("Create new cycle!")
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
      WorkoutType.where(active:true).each do |workoutType|
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
    
    redirect_to root_path
  end
  
  def show        
    @cycle = Cycle.find(params[:id])
    
    add_breadcrumb "Cycles", cycles_path
    add_breadcrumb "Cycle ##{@cycle.number}", cycle_path(@cycle)
  end
  
  def destroy
    cycle = Cycle.find(params[:id])
    if (cycle == current_user.cycles.last)
      cycle.destroy
      flash.now[:success] = "Cycle deleted."
      redirect_to root_path
    else
      flash.now[:danger] = "Cycle not deleted."
      @cycle = Cycle.find(params[:id])
      add_breadcrumb "Cycles", cycles_path
      add_breadcrumb "Cycle ##{@cycle.number}", cycle_path(@cycle)
      render 'show'
    end
  end
  
  private
    def correct_user
      user = current_user
      redirect_to(root_url) unless current_user?(Cycle.find(params[:id]).user)
    end
end
