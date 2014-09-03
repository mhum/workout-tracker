class WelcomeController < ApplicationController
  include SessionsHelper
  
  add_breadcrumb "Home", :root_path
  
  def index
    @user = current_user
    if @user
      redirect_to profile_path
    end
  end
end
