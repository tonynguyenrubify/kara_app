class Activity < ActiveRecord::Base
  attr_accessible :action, :item_id, :item_type, :related_item_type, :user_id, :item, :user

  belongs_to :user
  belongs_to :item, :polymorphic => true
  
  validates_presence_of :user, :item, :action, :related_item_type
  
  before_validation :set_default_related_item_type, :on => :create
  
  private
  
    def set_default_related_item_type
      self.related_item_type ||= self.item.class.name
    end
end
