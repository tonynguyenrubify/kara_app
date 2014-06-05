class Api::RolesController < ApiController
  def index
    roles = Role.all
    render :json => {roles: roles.collect{|x| single_role_json(x)}}
  end
  
  def single_role_json(role)
    return {
      id: role.id,
      name: role.name,
      code: role.code
    }
  end  
end