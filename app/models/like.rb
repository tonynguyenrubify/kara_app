class Like < ActiveRecord::Base
  attr_accessible :gift_id, :user_id
  
  belongs_to :user
  belongs_to :gift
  
  acts_as_commentable
  
  after_create do |like|
    AfterLikeCreationJob.perform_async(like.id)
  end
  
  
  def perform_after_like_is_created
    log_create_activity   
    # 
    # owner = self.user
    # self.members_receive_email(owner).each do |user|
    #   if user.is_vendor? == false and self.permitted_to?(:read, :questions, user) and user.restrict_vendor_tool?(:questions) and user.restrict_new_user_tool?(:questions) and (user.full_access == true)
    #     UserMailer.delay.question_create(user, self)
    #   end
    # end
    # 
    # if owner.questions.present? and owner.questions.size == 1
    #   UserMailer.delay.question_create_first_time(owner, self, tender_url('/discussion/new', true), tender_url('/faqs', true), tender_url('/discussions/suggestions', true))
    # end
  end
  
  private
    def log_create_activity
      activity = Activity.create!(:item => self, :user => self.user,
          :action => 'create')
      # create_feeds!(activity, self.user.contacts.collect(&:id))
    end
end
