var ICR360App = ICR360App || {};

ICR360App.MainMenus = Backbone.Collection.extend({
	model: ICR360App.MainMenu,
  url: "/api/users/main_menus"
});