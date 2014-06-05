class AddColumnForComments < ActiveRecord::Migration
  def up
    add_column :comments, :name, :string
    add_column :comments, :deleted, :boolean, :default => false
    add_column :comments, :deleted_at, :timestamp
    add_column :comments, :viewers, :integer
  end

  def down
    remove_column :comments, :name
    remove_column :comments, :deleted
    remove_column :comments, :deleted_at
    remove_column :comments, :viewers
  end
end
