class SessionsController < ApplicationController
  protect_from_forgery with: :exception
  include SessionsHelper

  add_breadcrumb "Home", :root_path

  def new
    if current_user
      redirect_to root_path
    end
    add_breadcrumb "Sign In", :root_path
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      sign_in user
      redirect_to root_path
    else
      flash.now[:danger] = 'Invalid email/password combination'
      render 'new'
    end
  end

  def destroy
    sign_out
    redirect_to root_url
  end
end
