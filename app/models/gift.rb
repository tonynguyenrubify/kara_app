class Gift < ActiveRecord::Base
  attr_accessible :active, :description, :name, :site_url, :user_id, :photo
  
  has_attached_file :photo, 
    :styles => { :medium => "300x300#", :thumb => "150x150#", :tiny => "19x19#", :thumb70 =>"70x70#" },
    :default_url => "/assets/user-missing.png",
    :url => '/system/:class/:id/:style/:filename',
    :path => ':rails_root/public:url'
    
  validates :description, :name, :presence => true  
  
  # belongs_to :user
  has_many :wishes, :dependent => :destroy
  has_many :users, :through => :wishes
  
  has_many :likes, :dependent => :destroy

  belongs_to :gift_owner, :class_name => "User", :foreign_key => :user_id
end
