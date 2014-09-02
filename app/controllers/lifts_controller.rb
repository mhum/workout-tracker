class LiftsController < ApplicationController
  
  def show
    @lift = Lift.find(params[:id])
  end
  
  def edit
    @lift = Lift.find(params[:id])
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
