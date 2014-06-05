var ICR360App = ICR360App || {};

ICR360App.UserView = Backbone.Marionette.ItemView.extend({
  template: jade.templates['user_view'],
  tagName: "div",
  className: "vendor",
  events: {
    "click a.more-service-list": "showAllServiceList",
    "click .actions ul li a.add": "addToMy",
    "click .actions ul li a.remove": "removeFromMy",
    "click a.rate": "showVendorRatingForm"
  },
  ui: {
    // inputRating: ":radio.rating",
    fullServiceListContent:".full-service-list",
    moreServiceList:".more-service-list"
  },
  onRender: function() {
    this.$el.attr({"id": "vendor_" + this.model.id});
    this.bindUIElements();
    // this.ui.inputRating.rating({half: true});
    var _this = this;
  },
  onShow: function(){
    this.bindUIElements();
  },
  showAllServiceList: function(event) {
    event.preventDefault();
    this.ui.fullServiceListContent.show();
    this.ui.moreServiceList.hide();
  },
  addToMy: function(event) {
    event.preventDefault();
    var currentTarget = $(event.target);
    var vendor = new ICR360App.VendorOverview();
    vendor.url = '/api/vendors/' + this.model.id + '/add_to_my';
    var _this = this;
    vendor.fetch({
      type: "PUT",
      success: function() {
        _this.model.set({can_remove_from_my: true});
        // currentTarget.removeClass("add").addClass("remove");
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

ICR360App.UsersView = Backbone.Marionette.CollectionView.extend({
  tagName: "div",
  className: "object_list",
  id: "vendors",
  itemView: ICR360App.UserView,
  ui: {
    inputRating: ":radio.rating",
    contentRatingStart: ".content-rating-start .raty-star"
  },
  initialize: function() {
    this.listenTo(this.collection, "change", this.render);
  },
  onRender: function() {
    this.bindUIElements();
  }
});