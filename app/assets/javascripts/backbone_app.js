//= require label_over

//= require ./backbonejs/libraries/jquery.simplemodal-1.4.5
//= require ./backbonejs/templates
//= require ./backbonejs/libraries/underscore-1.5.2
//= require ./backbonejs/libraries/backbone-1.1.0
//= require ./backbonejs/libraries/backbone.marionette-1.4.0

//= require_tree ./backbonejs/models
//= require_tree ./backbonejs/collections
//= require_tree ./backbonejs/views

//= require ./backbonejs/routers/app_router
//= require_tree ./backbonejs/routers

//= require backbone.queryparams


$.modal.defaults = {
	appendTo: 'body',
	focus: true,
	opacity: 50,
	overlayId: 'simplemodal-overlay',
	overlayCss: {'background-color':'#F2F2F2'},
	containerId: 'simplemodal-container',
	containerCss: {},
	dataId: 'simplemodal-data',
	dataCss: {},
	minHeight: 50,
	minWidth: 300,
	maxHeight: null,
	maxWidth: 550,
	autoResize: false,
	autoPosition: true,
	zIndex: 1000,
	close: true,
	closeHTML: '<a class="modalCloseImg" title="Close"></a>',
	closeClass: 'cancel',
	escClose: true,
	overlayClose: false,
	position: null,
	persist: false,
	onOpen: null,
	onShow: function(dialog) {
		$(dialog.container).css('height','auto');
		$('.simplemodal-wrap').css({height: 'auto', overflow: 'visible'});
  },
  modal: true,
	onClose: null,
	inputfocus: false
}

function startICR360Application(accessToken) {
  window.icr360Application = new Backbone.Marionette.Application();
  window.icr360Application.addRegions({
    leftSideBar: "#bottom_left_menu",
    settingNavigation: "#top_left_menu",
    rightSideBar: "#right_sidebar",
    mainContent: "#content_right_shadow",
    breadCrum: "#breadcrumb_container"
  });

  window.icr360Application.addInitializer(function(options) {
    window.activitiesRouter = new ICR360App.ActivitiesRouter({singleAccessToken: accessToken});
    new ICR360App.QuestionsRouter({singleAccessToken: accessToken});
    new ICR360App.GiftsRouter({singleAccessToken: accessToken});
    new ICR360App.UsersRouter({singleAccessToken: accessToken});
    // new ICR360App.VendorsRouter({singleAccessToken: accessToken});
    Backbone.history.start({pushState: false});
  });

  window.icr360Application.start();
}


function callBackOfGift(json_object) {
  window.giftsContentView.renderDataOfGiftAfterCreate(json_object);
}