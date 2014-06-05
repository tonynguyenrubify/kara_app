class CreateGifts < ActiveRecord::Migration
  def change
    create_table :gifts do |t|
      t.string :name
      t.text :description
      t.integer :user_id
      t.string :site_url
      t.boolean :active, :default => true
      t.string :photo_file_name
      t.string :photo_content_type
      t.integer :photo_file_size
      t.timestamp :photo_updated_at

      t.timestamps
    end
  end
end
