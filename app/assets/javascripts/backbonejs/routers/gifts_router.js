var ICR360App = ICR360App || {};

(function() {
	'use strict';
  ICR360App.GiftsController = Marionette.Controller.extend({
    // singleAccessToken attribute
    initialize: function(options) {
      this.gifts = new ICR360App.Gifts();
    },
    
    beforeFilter: function() {
      if(_.isUndefined(this.contentStageView) || this.contentStageView.isClosed) {
        this.contentStageView = new ICR360App.GiftsContentView({collection: this.gifts});
        window.giftsContentView = this.contentStageView;
        window.icr360Application.mainContent.show(this.contentStageView);
      }
    },
    
    index: function(filter, sort, params) {
      var _this = this;
      this.beforeFilter();
      // console.log("index");
      // var myVendorsView = new ICR360App.MyVendorsView();
      // myVendorsView.urlSearch = url;
      // _this.contentStageView.contentRegion.show(myVendorsView);
      // myVendorsView.listenTo(_this.vendors, "change", myVendorsView.updateLoadPageNumer);
      if(typeof(filter) == "undefined") {
        params = {keyword: ""};
        this.gifts.keyword = "";
      }
      else {
        params = {keyword: filter.keyword};
        this.gifts.keyword = filter.keyword;
      }
      this.gifts.url = "api/gifts";
      _this.contentStageView.urlSearch = "gifts"
      this.gifts.fetchData(_this.contentStageView);
      
       var j = 1;
 		   $(window).bind('scroll', function() {
         var scrollTop = $(this).scrollTop();
        if(scrollTop + 400 >= $("#gifts_container").height()) {
          // loading...
          if(j == 1) {
            console.log("go to loadmore 222222");
            // $(".content-loading-ajax-link-extract").show();
            j = 2;
            _this.gifts.loadMoreNotifications(function() {
              j = 1;
            });                      
          }
        }
      });
    },
    goToTab: function(tabName, filter, sort, params) {

      this.index(tabName, filter, sort, params);
    }
  });

	ICR360App.GiftsRouter = ICR360App.AppRouter.extend({    
	  el: "#container_wrapper",
    appRoutes: {
      "gifts": "index",  
      "gifts_(:tabName)_(:filter)_(:sort)": "goToTab",   
      "gifts_(:tabName)_(:subTabName)": "goToTab",
      "gifts_(:tabName)": "goToTab"
    },
    controller: new ICR360App.GiftsController()
  });
}());