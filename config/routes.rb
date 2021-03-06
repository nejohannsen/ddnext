Ddnext::Application.routes.draw do
  resources :game_classes
  resources :races
  resources :subraces
  resources :characters
  resources :character_classes

  patch "characters/:id/remove_class_level" => 'characters#remove_class_level'
  patch "characters/:id/add_class_level" => 'characters#add_class_level'

  patch "subraces/:id/update_feature" => 'subraces#update_to_add_feature'
  patch "races/:id/update_feature" => 'races#update_to_add_feature'

  patch "subraces/:id/add_feature" => 'subraces#new_to_add_feature'
  patch "races/:id/add_feature" => 'races#new_to_add_feature'

  patch "subraces/:id/remove_feature" => 'subraces#remove_to_add_feature'
  patch "races/:id/remove_feature" => 'races#remove_to_add_feature'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end
  
  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
