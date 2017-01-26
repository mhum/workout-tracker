Rails.application.routes.draw do
  shallow do
    resources :users, only: [:index, :create, :edit, :update] do
      resources :cycles
      resources :workouts
      resources :lifts
      end
  end
  resources :reports, only: [:index, :show] 
  resources :sessions, only: [:create, :destroy] 
  
  root 'welcome#index'  
  
  get 'profile',    to: 'users#edit'
  match '/signup',  to: 'users#new',            via: 'get'
  match '/signin',  to: 'sessions#new',         via: 'get'
  match '/signout', to: 'sessions#destroy',     via: 'delete'
  match '/cycles',  to: 'cycles#index',         via: 'get'
  match '/reports', to: 'reports#index',        via: 'get'
end
