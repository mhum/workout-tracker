class LiftsController < ApplicationController
  protect_from_forgery with: :exception
  include SessionsHelper
  
  before_action :signed_in_user, only: [:edit, :update, :show, :index]
  before_action :correct_user,   only: [:edit, :update, :show]
  
  add_breadcrumb "Home", :root_path
    
  def show
    @lift = Lift.find(params[:id])
    
    add_breadcrumb "Cycles", cycles_path
    add_breadcrumb "Cycle ##{@lift.workout.cycle.number}", cycle_path(@lift.workout.cycle)
    add_breadcrumb @lift.workout.workout_type.title, workout_path(@lift.workout)
    add_breadcrumb "Lift - #{@lift.workout_lift.title}", lift_path(@lift)    
  end
  
  def edit
    @lift = Lift.find(params[:id])
    
    add_breadcrumb "Cycles", cycles_path
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
      params.require(:lift).permit(:reps_completed, :completed_date)
    end

    def correct_user
      user = current_user
      redirect_to(root_url) unless current_user?(Lift.find(params[:id]).workout.cycle.user)
    end
end
