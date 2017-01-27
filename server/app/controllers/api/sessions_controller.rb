class Api::SessionsController < Api::BaseController
  include SessionsHelper

  def check
    render :json => "{\"result\": #{signed_in?}}"
  end

end
