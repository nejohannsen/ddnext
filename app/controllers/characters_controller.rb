class CharactersController < ApplicationController
  #load_and_authorize_resource param_method: :character_params

  def index
    @characters = Character.all
  end

  def show
    @character = Character.find(params[:id])
  end
end
