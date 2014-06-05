var ICR360App = ICR360App || {};

(function() {
  'use strict';

  ICR360App.AppRouter = Backbone.Marionette.AppRouter.extend({
    setupForAjaxRequest: function() {
      var _this = this;
      $.ajaxSetup({
        cache: false
      });
      $.ajaxPrefilter(function(options, origOptions, jqXHR) {
        jqXHR.setRequestHeader('single-access-token', _this.singleAccessToken);
      });
    },

    initialize: function(options) {
      this.singleAccessToken = options.singleAccessToken;
      this.setupForAjaxRequest();
      this.controller.singleAccessToken = this.singleAccessToken;
      
      if (!window.mainMenus) {
        window.mainMenus = new ICR360App.MainMenus(this.singleAccessToken);
        window.mainMenus.fetch({
          async: false,
          success: function() {
            var menuCollectionView = new ICR360App.MenuCollectionView({collection: window.mainMenus});
            window.icr360Application.leftSideBar.show(menuCollectionView);
            window.icr360Application.settingNavigation.show(new ICR360App.RecentWishesContentView());
          }
        });
      }
    }
  });

}());
