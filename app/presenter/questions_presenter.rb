class QuestionsPresenter < BasePresenter
  def initialize(user, params)
    super(user)
    @params = params
  end
  
  def extract_data_of_index
    page = @params[:page] || 1
    @questions = Question.search.paginate(:page => page, :per_page => 10)
    
    @questions_data = {page: page, questions: extract_questions_data(@questions), total_pages: @questions.total_pages}
  end  
  
  def extract_questions_data(questions)
    data = []
    questions.each do |question|
      data << question_json(question)
    end  
    return data
  end  
  
  def question_json(question)
    return {
      id: question.id,
      name: question.title,
      body: question.body,
      created_at: question.created_at,
      question_user_id: question.user_id
    }
  end  
end  