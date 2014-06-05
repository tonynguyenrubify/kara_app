class BackboneAppController < ApplicationController
  before_filter :authenticate_user!
  layout 'backbone_app'
  
  def index
    # render :layout => false
  end
end
