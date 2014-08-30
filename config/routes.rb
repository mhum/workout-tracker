Rails.application.routes.draw do
  
  resources :users do
    resources :cycles do
      resources :workouts
    end
  end
  resources :sessions, only: [:new, :create, :destroy] 
  root 'welcome#index'  
  match '/signup',  to: 'users#new', via: 'get'
  match '/signin',  to: 'sessions#new',         via: 'get'
  match '/signout', to: 'sessions#destroy',     via: 'delete'
end
