var ICR360App = ICR360App || {};

ICR360App.ModalBoxNoticeView = Backbone.Marionette.ItemView.extend({
  template: jade.templates['modal_box_notice_view'],
  tagName: "div",
  ui: {
  },
  events: {
    "click .close-vendor-detail-profile": "closeModalBox",
    "click .rating-form-close": "closeModalBox"
  },
  initialize: function(){
  },
  
  render: function() {
    var _this = this;
    this.$el.empty().append(this.template());
    $.modal.close();
    this.$el.modal({containerId: "simplemodal-container-solution-provider", overlayId: "simplemodal-overlay-solution-provider"});
    this.bindUIElements();
    this.delegateEvents();
  },
  onShow: function(){
  },
  closeModalBox: function(event) {
    event.preventDefault();  
    $.modal.close();
    return false;
  }
});