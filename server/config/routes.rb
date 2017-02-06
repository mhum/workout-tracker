Rails.application.routes.draw do
  namespace :api do

  end

  match '/api/auth',          to: 'api/sessions#authenticate_user', via: 'post'
  match '/api/cycles/latest', to: 'api/cycles#latest',              via: 'get'

end
