class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.integer :user_id
      t.integer :item_id, :references => nil
      t.string :item_type
      t.string :action
      t.string :related_item_type

      t.timestamps
    end
  end
end
