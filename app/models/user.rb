class User < ActiveRecord::Base
  include CropPicture
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  PHOTO_LENGTHS = {
    :original => 512,
    :large => 80,
    :small => 50,
    :tiny => 30,
    :other => 200
  }.freeze

  PHOTO_DIMENSIONS = PHOTO_LENGTHS.inject({}) do |photo_dimensions, photo_length|
    photo_dimensions[photo_length.first] = "#{photo_length.last}x#{photo_length.last}".freeze
    photo_dimensions
  end.freeze
  
  crop_picture :photo
  
  has_attached_file :photo,
    :default_url => '/assets/missing/:attachment/:style/missing.png',
    :styles => {
      :initial => {
        :geometry => "100%",
        :format => :png
      },
      :original => {
        :geometry => "#{PHOTO_DIMENSIONS[:original]}>",
        :format => :png,
        :convert_options => '-auto-orient -strip'
      },
      :large => {
        :geometry => "#{PHOTO_DIMENSIONS[:large]}>",
        :format => :png,
        :convert_options => '-auto-orient -strip'
      },
      :small => {
        :geometry => "#{PHOTO_DIMENSIONS[:small]}>",
        :format => :png,
        :convert_options => '-auto-orient -strip'
      },
      :tiny => {
        :geometry => "#{PHOTO_DIMENSIONS[:tiny]}>",
        :format => :png,
        :convert_options => '-auto-orient -strip'
      },
      :other => {
        :geometry => "#{PHOTO_DIMENSIONS[:other]}>",
        :format => :png,
        :convert_options => '-auto-orient -strip'
      }
    },
    :url => '/system/:class/:attachment/:id/:style/:digest.:extension',
    :path => ':rails_root/public:url',
    :processors => [:cropper]
  attr_accessible :email, :password, :password_confirmation, :authentication_token, :remember_me, :name, :first_name, :last_name, :crop_x, :crop_y, :crop_w, :crop_h, :photo
  
  belongs_to :role
  has_many :users
  
  has_many :activities, :dependent => :destroy
  has_many :wishes, :dependent => :destroy
  has_many :gifts, :through => :wishes
  
  has_many :likes, :dependent => :destroy
  
  has_many :gifts_owner, :class_name => 'Gift', :foreign_key => 'user_id', :dependent => :destroy
  
  has_many :followers, :foreign_key => "user_id", :dependent => :destroy
  
  before_save :set_membership_role_type
  
  before_create do |user|
    user.authentication_token = UUIDTools::UUID.timestamp_create.to_s    
  end
  
  def set_membership_role_type
    if(self.role)
    else
      self.role_id = Role.find_by_name("User").try(:id)
    end    
  end  
  
  def admin?
    (role.try(:code) == "superadmin")
  end
  
  def trainer?
    (role.try(:code) == "trainer")
  end
  
  def manager?
    (role.try(:code) == "manager") # operational manager
  end
  
  def coach?
    (role.try(:code) == "coach")
  end
  
  def new_hire?
    (role.try(:code) == "new_hire")
  end
  
  def training_manager?
    (role.try(:code) == "training_manager") # training manager
  end
  
  def logistic_manager?
    (role.try(:code) == "logistic_manager") # training manager
  end
  
  def normal_user?
    (role.try(:code) == "user")
  end
end
