class GiftsPresenter < BasePresenter
  def initialize(user, params)
    super(user)
    @params = params
  end
  
  def likes
    page = @params[:page] || 1
    like_gift_ids = current_user.likes.collect{|x| x.gift_id}.uniq + [0]
    @gifts = Gift.where("id IN (?)", like_gift_ids).order("created_at desc").search().paginate(:page => page, :per_page => 10)
    @gifts_data = {page: page, gifts: extract_gifts_data(@gifts), total_pages: @gifts.total_pages, keyword: @params[:keyword], is_admin: current_user.admin?}
  end
  
  def wishlist
    page = @params[:page] || 1
    @gifts = current_user.gifts.order("created_at desc").search().paginate(:page => page, :per_page => 10)
    @gifts_data = {page: page, gifts: extract_gifts_data(@gifts), total_pages: @gifts.total_pages, keyword: @params[:keyword], is_admin: current_user.admin?}
  end
    
  def extract_data_of_index
    page = @params[:page] || 1
    if @params[:keyword].present?
      search_query = {name_or_description_or_site_url_contains: @params[:keyword]}
      @gifts = Gift.order("created_at desc").search(search_query).paginate(:page => page, :per_page => 10)
    else
      @gifts = Gift.order("created_at desc").search.paginate(:page => page, :per_page => 6)
    end    
    
    @questions_data = {page: page, gifts: extract_gifts_data(@gifts), total_pages: @gifts.total_pages, keyword: @params[:keyword]}
  end  
  
  def extract_gifts_data(gifts)
    data = []
    gifts.each do |gift|
      data << gift_json(gift)
    end  
    return data
  end  
  
  def gift_json(gift)
    # gift_photo_url = image_url_for(gift, {:attachment => :photo, :image_style => :thumb})
    return {
      id: gift.id,
      name: gift.name,
      description: gift.description,
      gift_photo_url: gift.photo.url(:thumb),
      gift_photo_tiny_url: gift.photo.url(:thumb70),
      created_at: gift.created_at,
      can_add_a_gift: true,
      count_like: gift.likes.count,
      site_url: gift.site_url,
      gift_user_id: gift.user_id
    }
  end  
end