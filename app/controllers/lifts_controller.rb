class LiftsController < ApplicationController
  include SessionsHelper
  
  add_breadcrumb "Home", :root_path
  add_breadcrumb "Profile", :profile_path
    
  def show
    @lift = Lift.find(params[:id])
    
    add_breadcrumb "Cycles", user_cycles_path(current_user)
    add_breadcrumb "Cycle ##{@lift.workout.cycle.number}", cycle_path(@lift.workout.cycle)
    add_breadcrumb @lift.workout.workout_type.title, workout_path(@lift.workout)
    add_breadcrumb "Lift - #{@lift.workout_lift.title}", lift_path(@lift)    
  end
  
  def edit
    @lift = Lift.find(params[:id])
    
    add_breadcrumb "Cycles", user_cycles_path(current_user)
    add_breadcrumb "Cycle ##{@lift.workout.cycle.number}", cycle_path(@lift.workout.cycle)
    add_breadcrumb @lift.workout.workout_type.title, workout_path(@lift.workout)
    add_breadcrumb "Lift - #{@lift.workout_lift.title}", lift_path(@lift)   
  end
    
  def update
    @lift = Lift.find(params[:id])
 
    if @lift.update(lift_params)
      redirect_to :action => "show", :id => params[:id]
    else
      render 'edit'
    end
  end
  
  private
  def lift_params
    params.require(:lift).permit(:reps_completed)
  end
end
