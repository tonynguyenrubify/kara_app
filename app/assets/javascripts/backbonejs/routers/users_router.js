var ICR360App = ICR360App || {};

(function() {
	'use strict';
  ICR360App.UsersController = Marionette.Controller.extend({
    initialize: function(options) {
      this.gifts = new ICR360App.Gifts();
    },
    
    beforeFilter: function(url) {
      // if(_.isUndefined(this.contentStageView) || this.contentStageView.isClosed) {
      //   this.contentStageView = new ICR360App.MyWishesContentView({url_fetch: url});
      //   window.icr360Application.mainContent.show(this.contentStageView);
      // }
      this.contentStageView = new ICR360App.MyWishesContentView({url_fetch: url});
      window.icr360Application.mainContent.show(this.contentStageView);
      
      if(_.isUndefined(this.contentMenuLeftView) || this.contentMenuLeftView.isClosed) {
        this.contentMenuLeftView = new ICR360App.MenuLeftContentInProfileView();
        window.icr360Application.leftSideBar.show(this.contentMenuLeftView);
      }
    },
    
    index: function() {
      var _this = this;
      var url = "api/gifts/wishlist";
      this.beforeFilter(url);

    },
    _show_profile: function() {
      var _this = this;
      var url = "api/gifts/wishlist";
      this.beforeFilter(url);
      
    },
    _likes: function() {
      var _this = this;
      var url = "api/gifts/likes";
      this.beforeFilter(url);
    },
    
    goToTab: function(tabName, filter, sort) {
      if(tabName == "profile") {
        if(typeof(filter) == "undefined") {
          this._show_profile(); 
        }
        else if(filter == "likes") {
          this._likes();       
        }
        else if (filter == "wishlist") {
          this._show_profile(); 
        }
        
      }
      else {
        this.index();
      }
    }
  });

	ICR360App.UsersRouter = ICR360App.AppRouter.extend({    
	  el: "#container_wrapper",
    appRoutes: {
      "users": "index",  
      "users_(:tabName)_(:filter)_(:sort)": "goToTab",   
      "users_(:tabName)_(:subTabName)": "goToTab",
      "users_(:tabName)": "goToTab"
    },
    controller: new ICR360App.UsersController()
  });
}());