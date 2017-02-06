class Api::CyclesController < Api::BaseController
  before_action :authenticate_request!

  def latest
    cycle = @current_user.cycles.last
    render json: payload(cycle)
  end

  private

    def payload(cycles)
      cycles = cycles ? cycles : []
      {
        cycles: cycles
      }
    end

end
