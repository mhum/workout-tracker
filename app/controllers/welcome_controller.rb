class WelcomeController < ApplicationController
  include SessionsHelper
  
  add_breadcrumb "Home", :root_path
  
  def index
    @user = current_user
    if @user
      @current_lift = get_current_lift
      render "user_home"
    end
  end
  
  private
  
    def get_current_lift
      last_cycle = current_user.cycles.last
      workout_counter = 0
      lift_counter = 0
      if (last_cycle)
        last_cycle.workouts.each do |workout|
          reps_completed = workout.lifts[lift_counter].reps_completed
          if (!reps_completed)
            return workout.lifts[lift_counter]
          end
          workout_counter = workout_counter + 1
          if (workout_counter == 4)
            lift_counter = lift_counter + 1
          end
        end
        return nil
      end
    end
end
