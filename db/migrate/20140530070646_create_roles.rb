class CreateRoles < ActiveRecord::Migration
  def change
    create_table :roles do |t|
      t.string :name
      t.integer :priority
      t.boolean :active, :default => true
      t.string :code

      t.timestamps
    end
  end
end
