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
      if @subrace.update_attributes()
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

  def update_to_add_feature
    subrace = Subrace.find(params[:id])
    feature = subrace.to_add_features.find(subrace_params["id"])
    feature.update_attributes(subrace_params)
    subrace = Subrace.find(params[:id])
    respond_to do |f|
      responce = {subrace: subrace}
      f.json {render json: responce, status: :created, location: responce}
    end
  end

  def new_to_add_feature
    subrace = Subrace.find(params[:id])
    subrace.to_add_features << ToAddFeature.new(title: "", type: "", category: "", subcategory: "", value: "", requirements: [], notes: "")
    subrace.save
    subrace = Subrace.find(params[:id])
    respond_to do |f|
      responce = {subrace: subrace}
      f.json {render json: responce, status: :created, location: responce}
    end
  end

  def remove_to_add_feature
    subrace = Subrace.find(params[:id])
    subrace.to_add_features.delete_if do |feature|
      feature.id.to_s == subrace_params["id"]
    end
    subrace.save
    subrace = Subrace.find(params[:id])
    respond_to do |f|
      responce = {subrace: subrace}
      f.json {render json: responce, status: :created, location: responce}
    end
  end

  def subrace_params
    JSON.parse(params.required(:subrace))
  end
end
