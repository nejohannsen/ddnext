class RacesController < ApplicationController

  def index
    @races = Race.all
  end

  def new
    @race = Race.new()
  end

  def create
    @race = Race.new(race_params)
    if @race.save
      redirect_to races_path(), notice: "Created Race"
    else
      flash[:alert] = "Unable to create race"
      render 'new'
    end
  end

  def show
    @race = Race.find(params[:id])
  end

  def edit
    @race = Race.find(params[:id])
  end

  def update
    @race = Race.find(params[:id])
    respond_to do |format|
      if @race.update_attributes(race_params)
        responce = {race: @race}
        format.html {redirect_to @race, notice: "Updated Race"}
        format.json {render json: responce, status: :created, location: responce}
      else
        format.html {
          flash[:alert] = "Unable to update race"
           render "edit"
        }
      end
    end
  end

  def destroy
    @race = Race.find(params[:id])
    if @race.destory
      redirect_to race_path(), notice: "Race Destoryed"
    else
      redirect_to @race, alert: "Unable to destory race"
    end
  end

  def race_params
    JSON.parse(params.required(:race))
  end
end
