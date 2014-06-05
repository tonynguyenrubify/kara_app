var ICR360App = ICR360App || {};

ICR360App.SearchGiftsContentView = Backbone.Marionette.Layout.extend({
  template: jade.templates['search_gifts_content'],
  tagName: "div",
  events: {
    "click form#search .search": "searchSubmit",
    "blur input#keyword": "updateKeyword"
  },
  ui: {
    inputContainer: "input#keyword",
    labelInput: "form#search label"
  },
  initialize: function(options) {
//     this.listenTo(this.collection, "change", this.render);
    this.urlSearch = options.urlSearch;
  },
  onShow: function(){
    this.ui.labelInput.labelOver('over');
  },
  serializeData: function() {
    var viewData = {};
    if(typeof(this.collection.keyword) == "undefined") {
      this.collection.keyword = "";
    }
    
    viewData.keyword = this.collection.keyword;
    return viewData;
  },
  updateKeyword: function(event) {
    event.preventDefault();
    this.collection.keyword = this.ui.inputContainer.val();
    return false;
  },
  
  searchSubmit: function(event) {
    event.preventDefault();    
    var _this = this;
    this.collection.fetch({
      data: {keyword: _this.ui.inputContainer.val()},
      success: function(collection, response) {
        var url = _this.urlSearch + "?keyword=" + collection.keyword;
        window.location.hash = url;
      }
    });
  }
});