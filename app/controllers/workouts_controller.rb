class WorkoutsController < ApplicationController
  
  def show
    @workout = Workout.find(params[:id])
    @user = @workout.cycle.user
  end
  
  def edit
    @workout = Workout.find(params[:id])
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
end
