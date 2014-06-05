class AddSomeDefaultToRoles < ActiveRecord::Migration
  def up
    Role.destroy_all
    
    @role = Role.new({name: "Super Admin", priority: 1, active: true, code: "superadmin"})
    @role.save
    
    @role = Role.new({name: "Trainer", priority: 2, active: true, code: "trainer"})
    @role.save
    
    @role = Role.new({name: "Operations Manager", priority: 3, active: true, code: "manager"})
    @role.save
    
    @role = Role.new({name: "Coach", priority: 4, active: true, code: "coach"})
    @role.save
    
    @role = Role.new({name: "New Hire", priority: 5, active: true, code: "new_hire"})
    @role.save
    
    @role = Role.new({name: "Training Manager", priority: 6, active: true, code: "training_manager"})
    @role.save

    @role = Role.new({name: "Logistic Manager", priority: 7, active: true, code: "logistic_manager"})
    @role.save
    
    @role = Role.new({name: "User", priority: 8, active: true, code: "user"})
    @role.save
  end

  def down
  end
end
