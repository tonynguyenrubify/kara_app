var ICR360App = ICR360App || {};

(function() {
	'use strict';
  ICR360App.QuestionsController = Marionette.Controller.extend({
    // singleAccessToken attribute
    initialize: function(options) {
      this.questions = new ICR360App.Questions();
    },
    
    beforeFilter: function() {
      if(_.isUndefined(this.contentStageView) || this.contentStageView.isClosed) {
        this.contentStageView = new ICR360App.QuestionsContentView();
        window.icr360Application.mainContent.show(this.contentStageView);
        // this._loadFlash(); 
      }
    },
    
    index: function() {
      var _this = this;
      this.beforeFilter();
      console.log("index");
      // var myVendorsView = new ICR360App.MyVendorsView();
      // myVendorsView.urlSearch = url;
      // _this.contentStageView.contentRegion.show(myVendorsView);
      // myVendorsView.listenTo(_this.vendors, "change", myVendorsView.updateLoadPageNumer);
      this.questions.url = "api/questions";
      this.questions.fetchData(_this.contentStageView);
    },
    goToTab: function(tabName) {
      
    this.index(); // index is to be called regardless of tab
    }
  });

	ICR360App.QuestionsRouter = ICR360App.AppRouter.extend({    
	  el: "#container_wrapper",
    appRoutes: {
      "questions": "index",  
      "questions_(:tabName)_(:filter)_(:sort)": "goToTab",   
      "questions_(:tabName)_(:subTabName)": "goToTab",
      "questions_(:tabName)": "goToTab"
    },
    controller: new ICR360App.QuestionsController()
  });
}());