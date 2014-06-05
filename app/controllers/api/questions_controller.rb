class Api::QuestionsController < ApiController
  def index
    questions_data = QuestionsPresenter.new(@current_user, params)
    render :json => questions_data.extract_data_of_index
  end
end