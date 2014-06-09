class ActivitiesPresenter < BasePresenter
  def initialize(user, params)
    super(user)
    @params = params    
  end
  
  def data
    extract_data
    @activities_data
  end
  
  def extract_data
    current_page = @params[:page] ? @params[:page].to_i : 1
    activities = Activity.order("created_at desc").search.paginate(:page => current_page, :per_page => 6)
    total_page = activities.total_pages
    
    @activities_data = {total_page: total_page, activities: extract_activities_data(activities), current_page: current_page, photo_url: @user.photo.url(:large), user_id: @user.id, full_name: @user.name}
  end
  
  def extract_activities_data(activities)
    data = []   
    activities.each do |activity|
      if activity.item_type == "Like"
        data << like_gift_json(activity)
      elsif activity.item_type == "GroupMembership" and activity.related_item_type == "Group"
        data << join_group_json(activity)
      elsif activity.item_type == "Wish"
        data << wish_gift_json(activity)
      elsif activity.item_type == "Answer"
        data << answer_json(activity)
      elsif activity.item_type == "Question"
        data << question_json(activity)      
      elsif activity.item_type == "Job"
        if activity.action == "create"
          data << job_json(activity)
        elsif activity.action == "update"
          data << update_job_json(activity)
        elsif activity.action == "relist"
          data << relist_job_json(activity)
        end
      elsif activity.item_type == "Crisis"
        if activity.action == "create"
          data << crisis_create_json(activity)
        elsif activity.action == "update"
          data << crisis_update_json(activity)
        elsif activity.action == "close"
          data << crisis_close_json(activity)
        elsif activity.action == "join"
          data << crisis_join_json(activity)
        elsif activity.action == "reopen"
          data << crisis_reopen_json(activity)        
        elsif activity.action == "update_poll"
          data << crisis_update_poll_json(activity)
        end
      elsif activity.item_type == "Comment"
        if activity.related_item_type == "Answer"
          data << create_comment_for_answer_json(activity)
        elsif activity.related_item_type == "Question"
          data << create_comment_for_question_json(activity)
        elsif activity.item.commentable_type == "Story"          
          data << create_comment_for_story_json(activity)  
        elsif ["Vendor", "Group", "Crisis", "Story"].index(activity.related_item_type)
          data << create_comment_for_discussionable_json(activity)
        else
          data << {}
        end
      else
        data << {}      
      end
    end
    return data
  end
  
  
  def like_gift_json(activity)    
    gift = activity.item.gift
    user = activity.user
    return {
      id: activity.id,
      activity_type: "CreateLike",
      user_id: user.id,
      user_name: user.name,
      user_photo_url: user.photo.url(:large),
      gift_id: gift.id,
      gift_name: gift.name,
      gift_description: gift.description,
      gift_photo_url: gift.photo.url(:thumb70),
      gift_count_like: gift.likes.count,
      gift_site_url: gift.site_url,      
      created_at: activity.created_at.getutc.iso8601,
      time_ago: activity.created_at.to_s
    }
  end
  
  def wish_gift_json(activity)
    gift = activity.item.gift
    user = activity.user
    return {
      id: activity.id,
      activity_type: "CreateWish",
      user_id: user.id,
      user_name: user.name,
      user_photo_url: user.photo.url(:large),
      gift_id: gift.id,
      gift_name: gift.name,
      gift_description: gift.description,
      gift_photo_url: gift.photo.url(:thumb70),
      gift_count_like: gift.likes.count,
      gift_site_url: gift.site_url,      
      created_at: activity.created_at.getutc.iso8601,
      time_ago: activity.created_at.to_s
    }
  end   
end  