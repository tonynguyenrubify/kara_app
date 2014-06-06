class CreateFollowers < ActiveRecord::Migration
  def change
    create_table :followers do |t|
      t.integer :comment_id
      t.integer :user_id

      t.timestamps
    end
  end
end
