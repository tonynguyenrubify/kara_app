var ICR360App = ICR360App || {};

ICR360App.Gifts = Backbone.Collection.extend({
	model: ICR360App.Gift,
  url: "/api/gifts",
  parse: function(response) {
    this.page = parseInt(response.page, 10);
    this.total_pages = parseInt(response.total_pages, 10);
    this.keyword = response.keyword;
    this.is_admin = response.is_admin;
    return response.gifts;
  },
  
  fetchData: function(usersContentView) {
    var _this = this;
    
    this.fetch({
      data: { keyword: this.keyword },
      success: function(collection, response) {
        var usersView = new ICR360App.GiftsView({collection: collection});
        var searchGiftsContentView = new ICR360App.SearchGiftsContentView({collection: collection, urlSearch: usersContentView.urlSearch});
        usersContentView.searchContainer.show(searchGiftsContentView);
        usersContentView.contentRegion.show(usersView);
      }
    });
  },
  
  loadMoreNotifications: function(callback) {
    var nextPage = this.page + 1;
    // console.log(nextPage);
    // console.log(this.total_pages);
    if(nextPage <= this.total_pages) {
      this.fetch({
        remove: false,
	      data: { page: nextPage }, 
	      success: function() { 
          // $(".content-loading-ajax-link-extract").hide();
          if(typeof(callback) == "function") {
            callback.call();
          }
        }  	      
      });
    } else { 
      // $(".content-loading-ajax-link-extract").show().html("No more Gifts"); 
    }
  }
});