class WelcomeController < ApplicationController
  include SessionsHelper
  def index
    @user = current_user
    if @user
      redirect_to @user
    end
  end
end
