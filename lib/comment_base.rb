module CommentBase
  def self.included(base)
    base.extend(CommentBaseMethods)
  end

  module CommentBaseMethods
    def acts_as_comment
      include InstanceMethods

      include ActsAsCommentable::Comment
      # include ActivityLog
      
      attr_accessible :name, :body, :commentable_id, :commentable_type, :topic_list, :object

      # audited if APP_CONFIG[:enable_audit]
      # auto_normalize_attributes
      # has_activity_logs
      # acts_as_taggable_on :topic

      # NOTE: install the acts_as_votable plugin if you
      # want user to vote on the quality of comments.
      #acts_as_voteable
      acts_as_commentable

      belongs_to :commentable, :polymorphic => true
      # NOTE: Comments belong to a user
      belongs_to :user
      has_many :comment_followers, :class_name => "Follower", :foreign_key => "comment_id", :dependent => :destroy

      validates_presence_of :body

      after_create :log_create_activity
      # after_create :create_or_update_score
      # before_save :downcase_topic_list
      # after_destroy :destroy_score
      
    end
  end

  module InstanceMethods
    def second_level?
      self.commentable.respond_to?(:commentable)
    end

    def compact?
      [Question, Answer].include?(self.commentable.class)
    end

    def comment_recipient_ids(comment)
      self.commentable.comment_recipient_ids(comment)
    end

    def followers
      followers = self.comments.all.collect(&:user) + self.comment_followers.all.collect(&:user) + [self.user]
      followers.compact!
      followers.uniq!
      followers
    end
    
    def participants
      participants = self.comments.all.collect(&:user) + [self.user]
      participants.compact!
      participants.uniq!
      participants
    end
    
    def followings
      followings = self.comment_followers.all.collect(&:user) + [self.user]
      followings.compact!
      followings.uniq!
      followings
    end

    def related_item
      if self.commentable.is_a?(Story)
        self.commentable.user
      elsif self.second_level?
        self.commentable.commentable
      else
        self.commentable
      end
    end

    private
      def log_create_activity
        return unless self.user

        activity = Activity.create!(:item => self, :user => self.user,
            :action => 'create', :related_item_type => self.related_item.class.name)

        # create_feeds!(activity, Array(self.commentable.comment_recipient_ids(self)), self.user_id)
      end
      
      def downcase_topic_list
        self.topic_list.each(&:downcase!)
      end
  end

end
