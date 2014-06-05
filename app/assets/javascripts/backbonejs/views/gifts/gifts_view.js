var ICR360App = ICR360App || {};

ICR360App.GiftView = Backbone.Marionette.ItemView.extend({
  template: jade.templates['gift_view'],
  tagName: "div",
  className: "gift",
  events: {
    "click a.more-service-list": "showAllServiceList",
    "click .gift-actions a.wish": "addToWish",
    "click .actions ul li a.remove": "removeFromMy",
    "click .gift-actions a.like": "addLike",
    "click a.rate": "showVendorRatingForm"
  },
  ui: {
    fullServiceListContent:".full-service-list",
    moreServiceList:".more-service-list"
  },
  onRender: function() {
    this.$el.attr({"id": "gift_" + this.model.id});
    this.bindUIElements();
  },
  onShow: function(){
    this.bindUIElements();
  },
  showAllServiceList: function(event) {
    event.preventDefault();
    this.ui.fullServiceListContent.show();
    this.ui.moreServiceList.hide();
  },
  
  addToWish: function(event) {
    var _this = this;
    event.preventDefault();
    var currentTarget = $(event.target);
    var gift = new ICR360App.Gift();
    gift.url = '/api/gifts/' + this.model.id + '/add_to_wish';
    var _this = this;
    gift.fetch({
      type: "PUT",
      success: function(model, response) {
        if (typeof(response.result) != "undefined" && response.result == "You already wished for this") {
          // alert("You already wished for this!");
          var modalBoxNoticeView = new ICR360App.ModalBoxNoticeView();
          modalBoxNoticeView.render();
        }
        else {
          window.gifts.trigger("prepend", _this.model);
        }
      }
    });
    return false;
  },
  
  addLike: function(event) {  
    var _this = this;
    event.preventDefault();
    var currentTarget = $(event.target);
    var gift = new ICR360App.Gift();
    gift.url = '/api/gifts/' + this.model.id + '/add_like';
    var _this = this;
    gift.fetch({
      type: "PUT",
      success: function(model, response) {
        _this.model.set({count_like: response.count_like});
        var modalBoxNoticeView = new ICR360App.ModalBoxNoticeLikeView();
        modalBoxNoticeView.render();
      }
    });
    return false;
  },
  
  removeFromMy: function(event) {
    event.preventDefault();
    var currentTarget = $(event.target); 
    // var vendorName = $(currentTarget).data("name");
    var vendor = new ICR360App.VendorOverview();
    vendor.url = '/api/vendors/' + this.model.id + '/remove_from_my';
    var _this = this;
    vendor.fetch({
      type: "PUT",
      success: function(model, response) {
        if(_this.model.get("action_name") == "my") {
         _this.$el.hide(); 
         // _this.model.set({can_join_in_group: true, can_leave_in_group: false});
        }
        else {
          _this.model.set({can_remove_from_my: false});
        }
      }
    });
    return false;
  },
  showVendorRatingForm: function(event) {
    event.preventDefault();  
    var vendorRatingFormView = new ICR360App.VendorRatingFormView({model: this.model});
    vendorRatingFormView.render();
  }
});

ICR360App.GiftsView = Backbone.Marionette.CollectionView.extend({
  tagName: "div",
  className: "object_list",
  id: "gifts",
  itemView: ICR360App.GiftView,
  ui: {
  },
  initialize: function() {
    this.listenTo(this.collection, "change", this.render);
    this.listenTo(this.collection, "prepend", this.prependItem, this);
  },
  prependItem: function(item) {
    var itemView = new ICR360App.GiftView({model: item});
    this.$el.prepend(itemView.render().el);
    itemView.$el.css({opacity: 0}).animate({opacity: 1}, function() {
    });
  }
});