class Country < ActiveRecord::Base
  attr_accessible :alpha2, :lat, :lng, :name
  has_many :cities
end
