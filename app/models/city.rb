class City < ActiveRecord::Base
  attr_accessible :country_id, :geoname_id, :lat, :lng, :name
  belongs_to :country
end
