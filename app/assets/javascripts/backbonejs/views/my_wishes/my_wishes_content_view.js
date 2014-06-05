var ICR360App = ICR360App || {};

ICR360App.MyWishesContentView = Backbone.Marionette.Layout.extend({
  template: jade.templates['my_wishes_content_view'],
  tagName: "div",
  id: "content",
  regions: {
    contentRegion: ".content-my-wishes"
  },
  ui: {
    contentRegion: ".content-my-wishes"
  },
  initialize: function() {
    this.url_fetch = this.options.url_fetch;
    // console.log(this.url_fetch);
  },
  onRender: function() {
    var _this = this;
    var gifts = new ICR360App.Gifts();
    gifts.url = this.url_fetch;
    gifts.fetch({
      success: function(collection, response) {
        var giftsView = new ICR360App.GiftsView({collection: collection});
        _this.ui.contentRegion.html(giftsView.render().el);
      }
    });
  }
});