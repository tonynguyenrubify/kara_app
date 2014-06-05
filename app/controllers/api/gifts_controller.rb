class Api::GiftsController < ApiController
  include ActionView::Helpers::JavaScriptHelper
  def create   
    @gift = Gift.new(params[:gift])
    @gift.user_id = current_user.id
    attachment = params[:gift] && params[:gift][:photo]
    if attachment
      attachment.content_type =
          MIME::Types.type_for(attachment.original_filename).first.to_s
      @gift.photo = attachment
    end
    if @gift.save
      responds_to_parent do
        json = GiftsPresenter.new(@current_user, params).gift_json(@gift).to_json
        render :js => "callBackOfGift('#{escape_javascript(json)}')"
      end
      # render :json => GiftsPresenter.new(@current_user, params).gift_json(@gift)
    else
      render :json => {errors: "Failed"}
    end
  end
  
  def update
    @product = VendorProduct.find_by_id(params[:id])
    if @product.present?
      if permitted_to?(:update, @product)
        
        attachment = params[:vendor_product] && params[:vendor_product][:photo]
        if attachment
          attachment.content_type =
              MIME::Types.type_for(attachment.original_filename).first.to_s

          @product.photo = attachment
        end
        @product.attributes = params[:vendor_product]
        
        if @product.save
          # need to send email
          @product.send_email_notification_when_edited(current_user)
          responds_to_parent do
            json = VendorsPresenter.new(@current_user, params).single_product_json(@product).to_json
            render :js => "callBackOfVendorsCompanyPageProductUpdate('#{escape_javascript(json)}')"
          end
        else
          responds_to_parent do
            json = VendorsPresenter.new(@current_user, params).show_errors_json(@product).to_json
            render :js => "callBackOfVendorsCompanyPageProductUpdate('#{escape_javascript(json)}')"
          end
        end
      end
    else
      render :json => {errors: "Failed"}
    end    
  end
  
  def destroy
    gift = Gift.find_by_id(params[:id])
    gift.destroy
    render :json => {result: :ok}
  end
  
  def index
    questions_data = GiftsPresenter.new(@current_user, params)
    render :json => questions_data.extract_data_of_index
  end
  
  def add_like
    @gift = Gift.find_by_id(params[:id])
    if @gift.present?      
      check_like = Like.find_by_gift_id_and_user_id(@gift.id, @current_user.id)
      unless check_like.present?
        like = Like.create({gift_id: @gift.id, user_id: @current_user.id})
      end  
      render :json => GiftsPresenter.new(@current_user, params).gift_json(@gift)
    else
      render :json => {result: "failed"}
    end
  end
    
  def add_to_wish
    @gift = Gift.find_by_id(params[:id])
    if @gift.present?  
      if @current_user.gifts.include?(@gift)  
        render :json => {result: "You already wished for this"}
      else    
        @current_user.gifts << @gift
        render :json => GiftsPresenter.new(@current_user, params).gift_json(@gift)
      end  
      
    else
      render :json => {result: "failed"}
    end
  end  
  
  def remove_from_wish
    @gift = Gift.find_by_id(params[:id])
    if @gift.present?      
      @current_user.gifts.delete(@gift)
      render :json => {:result => "ok"}
    else
      render :json => {result: "failed"}
    end
  end  
  
  def wishlist
    render :json => GiftsPresenter.new(@current_user, params).wishlist()
  end  
  
  def likes
    render :json => GiftsPresenter.new(@current_user, params).likes()
  end  
end