var ICR360App = ICR360App || {};

ICR360App.ActivityCollection = Backbone.Collection.extend({
	model: ICR360App.Activity,
  url: "/api/activities/index",
  parse: function(response) {
    this.photo_url = response.photo_url;
    this.user_id = response.user_id;
    this.full_name = response.full_name;
    this.total_page = response.total_page;
    this.current_page = response.current_page;
    
    return response.activities;
  }
});