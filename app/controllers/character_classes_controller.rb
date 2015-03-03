class CharacterClassesController < ApplicationController

  def index
    @char_classes= CharacterClass.all
  end

  def new
    @char_class = CharacterClass.new()
  end

  def create
    @char_class = CharacterClass.new(char_class_params)
    if @char_class.save
      redirect_to character_classes_path(), notice: "Created Chararcter Class"
    else
      flash[:alert] = "Unable to create char_class"
      render 'new'
    end
  end

  def show
    @char_class = CharacterClass.find(params[:id])
  end

  def edit
    @char_class = CharacterClass.find(params[:id])
  end

  def update
    @char_class = CharacterClass.find(params[:id])
    if @char_class.update_attributes(char_class_params)
      redirect_to @char_class, notice: "Updated Chararcter Class"
    else
      flash[:alert] = "Unable to update char_class"
      render "edit"
    end
  end

  def destroy
    #TODO Need to adjust the level to work with the fact that something was removed. 
    @char_class = CharacterClass.find(params[:id])
    if @char_class.destroy
      redirect_to character_class_path(), notice: "Chararcter Class Destoryed"
    else
      redirect_to character_classes_path(), alert: "Unable to destory char_class"
    end
  end

  def char_class_params
    params.required(:character_class).permit(:character_id, :game_class_id)
  end
end
