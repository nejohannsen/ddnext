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
    @races = []
    Race.all.each do |race|
      temp = {}
      temp[:title] = race.title
      temp[:description] = race.description
      temp[:sub] = []
      race.subraces.each do |sub|
        sub_temp = {}
        sub_temp[:title] = sub.title
        sub_temp[:description] = sub.description
        temp[:sub] << sub_temp
      end
      @races << temp
    end
  end

  def create
    char = Character.create()
    redirect_to char
  end

  def update
    @char = Character.find(params[:id])
    respond_to do |format|
      if @char.update_attributes(JSON.parse(character_params))
        @char = Character.find(params[:id])
        @responce = {character: @char}
        format.html { redirect_to @char.to_document, notice: 'Class was added to character.' }
        format.json { render json: @responce, status: :created, location: @responce }
      else
        @error = "Nope"
        @char = Character.find(@char)
        @responce = {character: @char.to_document, error: @error}
        format.html { redirect_to @char, notice: 'Class was added to character.' }
        format.json { render json: @responce, status: :created, location: @responce }
      end
    end
  end

  def add_class_level
    char = Character.find(params[:id])
    char.character_classes.push(CharacterClass.new(title: params[:title]))
    respond_to do |format|
      if char.save
        char = Character.find(params[:id])
        responce = {character: char}
        format.html { redirect_to char, notice: 'Class was added to character.' }
        format.json { render json: responce, status: :created, location: responce }
      else
        @error = "Nope"
        @char = Character.find(@char)
        @responce = {character: @char.to_document, error: @error}
        format.html { redirect_to @char, notice: 'Class was added to character.' }
        format.json { render json: @responce, status: :created, location: @responce }
      end
    end
  end

  def remove_class_level
    char = Character.find(params[:id])
   
    #Adjust the object in the model. Need to make sure I have updated info
    if char.remove_class_level(params[:level])
      char = Character.find(char.id)
      cclasses = char.character_classes

      @responce = {character: char, character_classes: cclasses}
      respond_to do |format|
        format.json { render json: @responce, status: :created, location: @responce }
      end
    end
  end

  def character_params
    params.require(:character)
  end
end
