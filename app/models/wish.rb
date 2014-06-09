class Wish < ActiveRecord::Base
  attr_accessible :gift_id, :user_id
  
  belongs_to :user
  belongs_to :gift
  
  acts_as_commentable
  
  after_create do |wish|
    AfterWishCreationJob.perform_async(wish.id)
  end
  
  def perform_after_wish_is_created
    log_create_activity
  end  
  
  private
    def log_create_activity
      activity = Activity.create!(:item => self, :user => self.user,
          :action => 'create')
    end
end
