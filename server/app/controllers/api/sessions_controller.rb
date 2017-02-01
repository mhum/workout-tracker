class Api::SessionsController < Api::BaseController
  include SessionsHelper

  def check
    render :json => "{\"result\": #{signed_in?}}"
  end

  def create
    user = User.find_by(email: params["email"].downcase)
    if user && user.authenticate(params["password"])
      sign_in user

      remember_token = @current_user[:remember_token]
      render :json => "{\"result\": true, \"token\":\"#{remember_token}\"}"
    else
      render :json => '{"result": false, "msg": "Invalid email/password combination"}'
    end
  end

end
