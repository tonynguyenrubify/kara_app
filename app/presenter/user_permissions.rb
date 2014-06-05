class UserPermissions < BasePresenter
  def initialize(user)
    super(user)
    extract_permissions
  end
  
  def permissions
    return @permissions
  end
    
  private
  
  def extract_permissions
    @permissions = []
    if (can? :read, :dashboard)
      @permissions.push({
        :class_name => "activities", 
        :url => "/app#activities",
        :title => "Dashboard"
      })
    end
    if (can? :read, Gift)
      @permissions.push({
        :class_name => "Gift", 
        :url => "/app#gifts",
        :title => "Gift"
      })
    end
    
    if (can? :read, Role)
      @permissions.push({
        :class_name => "roles", 
        :url => "/app#roles",
        :title => "Roles"
      })
    end  
    
    if (can? :read, Question)
      @permissions.push({
        :class_name => "questions", 
        :url => "/app#questions",
        :title => "Questions"
      })
    end
  end  
  
  def extract_permisions_of_profile
    @permissions = []
    if (can? :read, :dashboard)
      @permissions.push({
        :class_name => "activities", 
        :url => "/app#activities",
        :title => "Dashboard"
      })
    end
    if (can? :read, Gift)
      @permissions.push({
        :class_name => "Gift", 
        :url => "/app#gifts",
        :title => "Gift"
      })
    end
    
    if (can? :read, Role)
      @permissions.push({
        :class_name => "roles", 
        :url => "/app#roles",
        :title => "Roles"
      })
    end  
    
    if (can? :read, Question)
      @permissions.push({
        :class_name => "questions", 
        :url => "/app#questions",
        :title => "Questions"
      })
    end
  end     
end