class Category < ActiveRecord::Base
  attr_accessible :active, :name
  
  validates :name, :presence => true
end
