class CharactersController < ApplicationController

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

  def create
    char = Character.create()
    redirect_to char
  end

  def update
    @char = Character.find(params[:id])
    if params[:character_class].present?
      respond_to do |format|
        if @char.character_classes.create(game_class_id: params[:character_class][:game_class])
          @char = Character.find(@char)
          @cclasses = @char.character_classes
          @responce = {character: @char, character_classes: @cclasses}
          format.html { redirect_to @char, notice: 'Class was added to character.' }
          format.json { render json: @responce, status: :created, location: @responce }
        end
      end
    else
      if @char.update_attributes(params[:character])
        respond_to do |format|
          format.html {redirect_to @char, notice: "Updated character"}
          format.js { @char.to_json }
        end
       else
         respond_to do |format|
           format.html {
             flash[:alert] = "Unable to update character"
             render 'edit'
           }
           format.js { @char.to_json }
         end
      end

    end
  end
end
