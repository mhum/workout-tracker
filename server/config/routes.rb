Rails.application.routes.draw do
  namespace :api do

  end

  match '/api/auth',  to: 'api/sessions#authenticate_user',      via: 'post'

end
