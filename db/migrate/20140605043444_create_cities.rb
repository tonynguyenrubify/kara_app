class CreateCities < ActiveRecord::Migration
  def change
    create_table :cities do |t|
      t.string :name
      t.string :lat
      t.string :lng
      t.integer :country_id
      t.integer :geoname_id

      t.timestamps
    end
  end
end
