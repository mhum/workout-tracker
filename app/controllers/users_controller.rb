class UsersController < ApplicationController
  protect_from_forgery with: :exception
  include SessionsHelper

  before_action :signed_in_user, only: [:edit, :update, :show, :index]
  before_action :correct_user,   only: [:edit, :update]

  add_breadcrumb "Home", :root_path
  def index
    add_breadcrumb "Users"

    @users = User.all
  end

  def new
    add_breadcrumb "Sign Up", :root_path

    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:success] = "Welcome to the Workout Tracker!"
      sign_in @user
      redirect_to profile_path
    else
      render 'new'
    end
  end

  def show
    add_breadcrumb "Profile"

    @current_lift = get_current_lift
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :email, :password, :password_confirmation)
    end
  
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
