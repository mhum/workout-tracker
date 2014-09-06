Rails.application.routes.draw do
  shallow do
    resources :users, only: [:index, :create, :edit, :update] do
      resources :cycles
      resources :workouts
      resources :lifts
      end
  end
  resources :sessions, only: [:create, :destroy] 
  
  root 'welcome#index'  
  
  #match '/profile', to: 'users#show',           via: 'get'
  get 'profile',    to: 'users#edit'
  match '/signup',  to: 'users#new',            via: 'get'
  match '/signin',  to: 'sessions#new',         via: 'get'
  match '/signout', to: 'sessions#destroy',     via: 'delete'
end
