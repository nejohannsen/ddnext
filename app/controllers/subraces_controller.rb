class SubracesController < ApplicationController

  def index
    @subraces = Subrace.all
  end

  def new
    @subrace = Subrace.new()
  end

  def create
    @subrace = Subrace.new(subrace_params)
    if @subrace.save
      redirect_to subraces_path(), notice: "Created Subrace"
    else
      flash[:alert] = "Unable to create subrace"
      render 'new'
    end
  end

  def show
    @subrace = Subrace.find(params[:id])
  end

  def edit
    @subrace = Subrace.find(params[:id])
  end

  def update
    @subrace = Subrace.find(params[:id])
    respond_to do |format|
      if @subrace.update_attributes(subrace_params)
        responce = {subrace: @subrace}
        format.html {redirect_to @subrace, notice: "Updated Subrace"}
        format.json {render json: responce, status: :created, location: responce}
      else
        format.html {
          flash[:alert] = "Unable to update subrace"
          render "edit"
        }
      end
    end
  end

  def destroy
    @subrace = Subrace.find(params[:id])
    if @subrace.destory
      redirect_to subrace_path(), notice: "Subrace Destoryed"
    else
      redirect_to @subrace, alert: "Unable to destory subrace"
    end
  end

  def subrace_params
    JSON.parse(params.required(:subrace))
  end
end
