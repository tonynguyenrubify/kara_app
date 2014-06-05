var ICR360App = ICR360App || {};

ICR360App.Questions = Backbone.Collection.extend({
	model: ICR360App.Question,
  url: "/api/questions/index",
  parse: function(response) {
    this.page = parseInt(response.page, 10);
    this.total_pages = parseInt(response.total_pages, 10);
    return response.questions;
  },
  
  fetchData: function(questionsContentView) {
    var _this = this;
    this.fetch({
      success: function(collection, response) {
        console.log("fetchData");
        var questionsView = new ICR360App.QuestionsView({collection: collection});
        questionsContentView.contentRegion.show(questionsView);
      }
    });
  }
});