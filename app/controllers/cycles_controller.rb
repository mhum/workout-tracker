class CyclesController < ApplicationController
  
  def index
    @user = User.find(params[:user_id])
    @cycle = @user.cycles.all
  end
  
  def create
    @user = User.find(params[:user_id])
    @cycle = @user.cycles.create(cycle_params)
    @cycle.workouts.create(title:'Squat', repmax:0)
    @cycle.workouts.create(title:'Bench Press', repmax:0)
    @cycle.workouts.create(title:'Deadlift', repmax:0)
    @cycle.workouts.create(title:'Overhead Press', repmax:0)
    redirect_to user_path(@user)
  end
  
  def show
    @cycle= Cycle.find(params[:id])
  end
  
  def destroy
    @user = User.find(params[:user_id])
    @cycle = @user.cycles.find(params[:id])
    @cycle.destroy
    redirect_to user_path(@user)
  end
 
  private
    def cycle_params
      params.require(:cycle).permit(:title)
    end
end
