class WorkoutsController < ApplicationController
  include SessionsHelper
  
  add_breadcrumb "Home", :root_path
  add_breadcrumb "Profile", :profile_path
  
  def show
    @workout = Workout.find(params[:id])
    
    add_breadcrumb "Cycles", user_cycles_path(current_user)
    add_breadcrumb "Cycle ##{@workout.cycle.number}", cycle_path(@workout.cycle)
    add_breadcrumb @workout.workout_type.title, workout_path(@workout)
  end
  
  def edit
    @workout = Workout.find(params[:id])
    
    add_breadcrumb "Cycles", user_cycles_path(current_user)
    add_breadcrumb "Cycle ##{@workout.cycle.number}", cycle_path(@workout.cycle)
    add_breadcrumb @workout.workout_type.title, workout_path(@workout)
  end
  
  def update
    @workout = Workout.find(params[:id])
 
    if @workout.update(workout_params)
      redirect_to :action => "show", :id => params[:id]
    else
      render 'edit'
    end
  end
  
  private
  def workout_params
    params.require(:workout).permit(:repmax)
  end  
  
  def current_cycle
    Workout.find(params[:id]).cycle
  end
end
