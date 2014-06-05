class Role < ActiveRecord::Base
  attr_accessible :name, :priority, :active, :code
  has_many :users
  
  def to_s
    self.name
  end
end
