class AfterLikeCreationJob
  include Sidekiq::Worker
  def perform(like_id)
    Like.find_by_id(like_id).perform_after_like_is_created
  end
end