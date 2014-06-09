class AfterWishCreationJob
  include Sidekiq::Worker
  def perform(wish_id)
    Wish.find_by_id(wish_id).perform_after_wish_is_created
  end
end