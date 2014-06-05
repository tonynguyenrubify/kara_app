var ICR360App = ICR360App || {};

ICR360App.Users = Backbone.Collection.extend({
	model: ICR360App.User,
  url: "/api/users",
  parse: function(response) {
    this.page = parseInt(response.page, 10);
    this.total_pages = parseInt(response.total_pages, 10);
    return response.users;
  },
  
  fetchData: function(usersContentView) {
    var _this = this;
    this.fetch({
      success: function(collection, response) {
        var usersView = new ICR360App.UsersView({collection: collection});
        usersContentView.contentRegion.show(usersView);
      }
    });
  }
});