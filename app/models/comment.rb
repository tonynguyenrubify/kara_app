require 'comment_base'
class Comment < ActiveRecord::Base
  include CommentBase
  include ActsAsCommentable::Comment

  acts_as_comment
  
  validate :uniqueness_of_body_and_user
  
  # belongs_to :commentable, :polymorphic => true

  # default_scope :order => 'created_at ASC'

  # NOTE: install the acts_as_votable plugin if you
  # want user to vote on the quality of comments.
  #acts_as_voteable

  # NOTE: Comments belong to a user
  # belongs_to :user
  
  def uniqueness_of_body_and_user
    if self.new_record? and Comment.find(:first, :conditions => {:body => self.body.strip, :user_id => self.user_id, :commentable_id => self.commentable_id, :commentable_type => self.commentable_type })
      errors.add(:base, "Duplicate content is detected!")
    end
  end
  
end
