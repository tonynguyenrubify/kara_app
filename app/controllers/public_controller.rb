class PublicController < ApplicationController
  layout 'application'
  
  def index
    if current_user.present?
      redirect_to "/app#gifts"
    else
    end    
  end
end