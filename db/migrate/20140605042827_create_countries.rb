class CreateCountries < ActiveRecord::Migration
  def change
    create_table :countries do |t|
      t.string :name
      t.string :alpha2
      t.string :lat
      t.string :lng

      t.timestamps
    end
  end
end
