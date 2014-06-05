var ICR360App = ICR360App || {};

ICR360App.GiftsContentView = Backbone.Marionette.Layout.extend({
  template: jade.templates['gifts_content_view'],
  tagName: "div",
  id: "content",
  regions: {
    vendorsNavigation: "#vendors_navigation",
    imageBackgroundContainer:"#image_background_container",
    profileVendorContainer: "#profile_vendor_container",
    // contentRegion: ".content-new-tab",
    contentRegion: "#gifts_container",
    searchContainer: "#search_container",
    subVendorsNavigation: "#sub_vendors_navigation",
    parentContentBorder: "#content_border",
    flashContainer: "#flash"
  },
  
  events: {
     "click form.add-a-new-gift input": "addANewGift",
     "click form.new-product span.close_icon": "closeAddANewResource",
     "click form.new-product li.cancel a": "closeAddANewResource",
     
     "click .product-submit-action input": "submitAProduct",
     "change #vendor_product_name": "changeNameOfProduct"
  },
  
  ui: {
    formNewGift: "form#new_gift",
    labelInput: "form.document label",
    giftsContainer: "#gifts_container",
    loadMoreButton: ".show-more-backbone a",
    loadMoreButtonParent: ".show-more-backbone",
    buttonCreateGift: "li.gift-submit-action input",
    giftNameInput: "#gift_name",
    giftSiteUrlInput: "#gift_site_url",
    giftDescriptionText: "#gift_description",
    documentAttachmentInputGiftPhoto: "#gift_photo"
  },
  
  initialize: function() {
    this.listenTo(this.collection, "change", this.updateLoadMoreButton);
    this.collection.page = 1;
    this.nextPage = this.collection.page + 1;
    this.first_time = true;
  },
  
  onShow: function() {
    var _this = this;
    this.bindUIElements();
    this.ui.labelInput.labelOver('over');
    
    var singleAccessToken = window.activitiesRouter.singleAccessToken;
    if(this.ui.formNewGift.find("input[name='api_authen_token']").length == 0) {
      this.ui.formNewGift.append("<input type='hidden' name='api_authen_token' value='" + singleAccessToken + "' />");
    }
    
  },
  updateLoadMoreButton: function() {    
    var currentPage = this.collection.page;
    var totalPage = this.collection.total_pages;
    this.nextPage = currentPage + 1;
    if(this.nextPage > totalPage) {

    }
  },
  
  loadMoreNotifications: function(callback) {
    var _this = this;
    this.collection.url = "/api/gifts/";
  
    if(this.nextPage <= this.collection.total_pages) {
      this.collection.fetch({
        add: false, 
	      data: { page: _this.nextPage},
	      success: function() { 
          $(".content-loading-ajax-link-extract").hide();
          // MiscUtility.enableNanoScroller();
          if(typeof(callback) == "function") {
            callback.call();
          }
        }  	      
      });
    } else { 
      $(".content-loading-ajax-link-extract").show().html("No more Gifts"); 
    }
  },
  
  loadMore: function() {
    // event.preventDefault();
    var _this = this;
    this.collection.url = "/api/gifts/";
    this.collection.fetch({
      remove: false,
      data: { page: _this.nextPage},
      success: function() {
        _this.collection.trigger("change");
      }
    });
  },
  
  addANewGift: function(event) {
    event.preventDefault();
    this.ui.formNewGift.show();
  },
  
  renderDataOfGiftAfterCreate: function(json_object_return) {
    var model_render = JSON.parse(json_object_return);
    if(model_render.errors) {
      alert(model_render.errors);
      // this.ui.buttonCreateProduct.removeClass('gray_submit').removeAttr('disabled');
    }
    else {
      var gift = new ICR360App.Gift(model_render);
      this.collection.trigger("prepend", gift);
      this.ui.giftNameInput.val("");
      this.ui.giftSiteUrlInput.val("");
      this.ui.giftDescriptionText.val("");
      this.ui.formNewGift.hide();
      this.ui.documentAttachmentInputGiftPhoto.val("");
      // this.ui.buttonCreateProduct.removeClass('gray_submit').removeAttr('disabled');
    }
  }
});