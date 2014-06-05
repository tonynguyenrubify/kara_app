var ICR360App = ICR360App || {};

ICR360App.MenuLeftContentInProfileView = Backbone.Marionette.Layout.extend({
  template: jade.templates['menu_left_content_in_profile_view'],
  tagName: "div",
  id: "content",
  regions: {
    contentRegion: ".content-new-tab"
  },
  ui: {
    contentRegion: ".content-new-tab"
  },
  onRender: function() {
    var _this = this;
    // window.gifts = new ICR360App.Gifts();
    // window.gifts.url = "api/gifts/wishlist";
    // window.gifts.fetch({
    //   success: function(collection, response) {
    //     var leftRecentWishesView = new ICR360App.LeftRecentWishesView({collection: collection});
    //     // _this.ui.giftsContainer.html(giftsView.render().el);
    //     _this.ui.contentRegion.html(leftRecentWishesView.render().el);
    //   }
    // });
  }
});