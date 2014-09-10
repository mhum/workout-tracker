class UsersController < ApplicationController
  protect_from_forgery with: :exception
  include SessionsHelper

  before_action :signed_in_user, only: [:edit, :update, :show, :index]
  before_action :correct_user,   only: [:update]

  add_breadcrumb "Home", :root_path
  def index
    add_breadcrumb "Users"

    @users = User.all
  end

  def new
    if current_user
      redirect_to root_path
    end
    add_breadcrumb "Sign Up", :root_path

    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:success] = "Welcome to the Workout Tracker!"
      sign_in @user
      redirect_to root_path
    else
      render 'new'
    end
  end

  def edit
    add_breadcrumb "Profile"
    @user = current_user
  end
  
  def update
    @user = current_user
    if @user.update_attributes(user_params)
      flash[:success] = "Profile updated"
      redirect_to root_path
    else
      render 'edit'
    end
  end

  private
    def user_params
      params.require(:user).permit(:first_name, :email, :password, :password_confirmation)
    end
    
    def correct_user
      user = current_user
      redirect_to(root_url) unless current_user?(User.find(params[:id]))
    end
end
