class WorkoutsController < ApplicationController
  protect_from_forgery with: :exception
  include SessionsHelper
  
  before_action :signed_in_user, only: [:edit, :update, :show, :index]
  before_action :correct_user,   only: [:edit, :update, :show]
  
  add_breadcrumb "Home", :root_path
  
  def show
    @workout = Workout.find(params[:id])
    
    add_breadcrumb "Cycles", cycles_path
    add_breadcrumb "Cycle ##{@workout.cycle.number}", cycle_path(@workout.cycle)
    add_breadcrumb @workout.workout_type.title, workout_path(@workout)
  end
  
  def edit
    @workout = Workout.find(params[:id])
    
    add_breadcrumb "Cycles", cycles_path
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
  
    def correct_user
      user = current_user
      redirect_to(root_url) unless current_user?(Workout.find(params[:id]).cycle.user)
    end
end
