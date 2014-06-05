var ICR360App = ICR360App || {};

ICR360App.LeftRecentWishView = Backbone.Marionette.ItemView.extend({
  template: jade.templates['left_recent_wish_view'],
  tagName: "div",
  className: "gift",
  events: {
  },
  ui: {
  },
  onRender: function() {
    this.$el.attr({"id": "gift_" + this.model.id});
    this.bindUIElements();
  },
  onShow: function(){
    this.bindUIElements();
  }
});

ICR360App.LeftRecentWishesView = Backbone.Marionette.CollectionView.extend({
  tagName: "div",
  className: "object_list",
  id: "left_recent_wishes",
  itemView: ICR360App.LeftRecentWishView,
  ui: {
  },
  initialize: function() {
    this.listenTo(this.collection, "change", this.render);
    this.listenTo(this.collection, "prepend", this.prependItem, this);
  },
  prependItem: function(item) {
    var itemView = new ICR360App.LeftRecentWishView({model: item});
    this.$el.prepend(itemView.render().el);
    itemView.$el.css({opacity: 0}).animate({opacity: 1}, function() {
    });
  }
});