Rails.application.routes.draw do
  resources :technologies
  root to: 'meetups#new'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :meetups
end
