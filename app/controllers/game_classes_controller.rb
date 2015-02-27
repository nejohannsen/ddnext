class GameClassesController < ApplicationController

  def index
    @classes = GameClass.all
  end

  def new
    @class = GameClass.new()
  end

  def create
    @class = GameClass.new(class_params)
    if @class.save
      redirect_to game_classes_path(), notice: "Created Class"
    else
      flash[:alert] = "Unable to create class"
      render 'new'
    end
  end

  def show
    @class = GameClass.find(params[:id])
  end

  def edit
    @class = GameClass.find(params[:id])
  end

  def update
    @class = GameClass.find(params[:id])
    if @class.update_attributes(class_params)
      redirect_to @class, notice: "Updated Class"
    else
      flash[:alert] = "Unable to update class"
      render "edit"
    end
  end

  def destroy
    @class = GameClass.find(params[:id])
    if @class.destory
      redirect_to game_classes_path(), notice: "Classes Destoryed"
    else
      redirect_to @class, alert: "Unable to destory class"
    end
  end

  def class_params
    params.required(:game_class).permit(:title, :description)
  end
end
