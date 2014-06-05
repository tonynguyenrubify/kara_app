var ICR360App = ICR360App || {};

ICR360App.SupportNavigation = Backbone.Marionette.ItemView.extend({
  template: jade.templates['support_navigation'],
  tagName: "ul",
  id: "support_navigation"  
});

ICR360App.MenuView = Backbone.Marionette.ItemView.extend({
  template: jade.templates['menu_view'],
  tagName: "li",
  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },
  onRender: function() {
    this.$el.attr({"id": "simple_navigation_default_navigation_menus_" + this.model.get("class_name"), "class": "menu", "drop_down": false});
    if(this.model.get("active")) {
      this.$el.addClass("current");
    }//end if
  }  
});

ICR360App.MenuCollectionView = Backbone.Marionette.CollectionView.extend({
  tagName: "ul",
  className: "simple_navigation",
  id: "simple_navigation_default_navigation",
  itemView: ICR360App.MenuView
});