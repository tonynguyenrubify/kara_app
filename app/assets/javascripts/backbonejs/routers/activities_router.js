var ICR360App = ICR360App || {};

(function() {
	'use strict';
  ICR360App.ActivitiesController = Marionette.Controller.extend({
    // singleAccessToken attribute
    initialize: function(options) {
      this.users = new ICR360App.Users();
      // this.activities = new ICR360App.ActivityCollection();
    },
    
    beforeFilter: function() {
      if(_.isUndefined(this.contentStageView) || this.contentStageView.isClosed) {
        this.contentStageView = new ICR360App.ActivitiesContentView();
        window.icr360Application.mainContent.show(this.contentStageView);
      }
    },
    
    index: function() {
      var _this = this;
      this.beforeFilter();
      // this.users.url = "api/users";
      // this.users.fetchData(_this.contentStageView);      
      var activities = new ICR360App.ActivityCollection();
      activities.fetch({
        success: function(collection, response) {          
          var activitiesView = new ICR360App.ActivitiesView({collection: collection});
          _this.contentStageView.contentRegion.show(activitiesView);
        }
      });      
    },
    goToTab: function(tabName) {
      
    this.index(); // index is to be called regardless of tab
    }
  });

	ICR360App.ActivitiesRouter = ICR360App.AppRouter.extend({    
	  el: "#container_wrapper",
    appRoutes: {
      "": "goToTab",
      "#": "goToTab",
      "activities": "goToTab",
      "activities_(:tabName)": "goToTab"
    },
    controller: new ICR360App.ActivitiesController()
  });
}());