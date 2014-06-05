class Api::UsersController < ApiController
  def main_menus
    user_permission = UserPermissions.new(@current_user)
    render :json => user_permission.permissions
  end
  
  def index
    users_data = UsersPresenter.new(@current_user, params)
    render :json => users_data.extract_data_of_index
  end
end