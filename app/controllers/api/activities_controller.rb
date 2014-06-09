class Api::ActivitiesController < ApiController
  def index
    activities_data = ActivitiesPresenter.new(@current_user, params)
    render :json => activities_data.data
  end
end  