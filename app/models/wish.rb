class Wish < ActiveRecord::Base
  attr_accessible :gift_id, :user_id
  
  belongs_to :user
  belongs_to :gift
end
