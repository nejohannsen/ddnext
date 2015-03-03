class Api::CharactersController < ApplicationController

  def index
    @characters = Character.all
  end

  def show
    @character = Character.find(params[:id])
    @avaliable_classes = []
    GameClass.all.each do |gclass|
      @avaliable_classes <<  {id: gclass.id, title: gclass.title}
    end
    @character_classes = CharacterClass.where(character_id: params[:id])
  end

  def edit

  end

  def update
    @char = Character.find(params[:id])
    debugger
    if params[:character_class].present?
      if @char.character_classes.create(game_class_id: params[:character_class][:game_class])
        respond_to to |format|
          format.json {render :json => @char}
        redirect_to @char, notice: "Added class to character"
      end
    else
      if @char.update_attributes(params[:character])
        respond_to do |format|
          format.json { render :json => @char }
        end
       else
         respond_to do |format|
           format.json { render :json => @char, status: 422 }
         end
      end

    end
  end
end
