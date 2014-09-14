class ReportsController < ApplicationController
  include CyclesHelper
  include WorkoutsHelper
  include SessionsHelper
  
  before_action :signed_in_user, only: [:edit, :update, :show, :index]
  
  add_breadcrumb "Home", :root_path
  
  def index
    @all_workouts = WorkoutType.all
    
    #iterate through all cycles
    current_user.cycles.all.each do |cycle| 
      test cycle, nil
    end
        
    add_breadcrumb "Reports"
  end
  
  def show
    @workout_type = WorkoutType.find(params[:id])
    
        #iterate through all cycles
    current_user.cycles.all.each do |cycle| 
      test cycle, @workout_type
    end
    
    add_breadcrumb "Reports", reports_path
    add_breadcrumb @workout_type.title
  end
  
  private
    def correct_user
      user = current_user
      redirect_to(root_url) unless current_user?(current_user.cycles.last.user)
    end
    
    def test (cycle, workout_filter)
      #iterate through all workouts in the cycle
      cycle.workouts.each do |workout| 
        #create instance variable for workout if it doesn't exist
        if (workout_filter == nil || workout.workout_type === workout_filter)
          if (!instance_variable_defined?("@#{workout.workout_type.title.gsub(/\s+/, "")}_label"))
            #Create label instance variable
            instance_variable_set("@#{workout.workout_type.title.gsub(/\s+/, "")}_label", [])
            #Create data instance variable
            instance_variable_set("@#{workout.workout_type.title.gsub(/\s+/, "")}_data", [])
          end
          #iterate through all the lifts in the workout
          workout.lifts.each do |lift|
            if (lift.completed_date)
              #Add date to label variable
              instance_variable_get("@#{workout.workout_type.title.gsub(/\s+/, "")}_label")  << lift.completed_date.strftime("%m/%d/%Y")
              #Add calculated one rep max to data variable
              instance_variable_get("@#{workout.workout_type.title.gsub(/\s+/, "")}_data") << calc_orm(lift)
            end
          end   
        end   
      end
    end
end
