class UsersPresenter < BasePresenter
  def initialize(user, params)
    super(user)
    @params = params
  end
  
  def extract_data_of_index
    page = @params[:page] || 1
    @users = User.search.paginate(:page => page, :per_page => 10)
    
    @users_data = {page: page, users: extract_users_data(@users), total_pages: @users.total_pages}
  end  
  
  def extract_users_data(users)
    data = []
    users.each do |user|
      data << user_json(user)
    end  
    return data
  end  
  
  def user_json(user)
    return {
      id: user.id,
      name: [user.first_name, user.last_name].join(" "),
      email: user.email,
      created_at: user.created_at
    }
  end  
end