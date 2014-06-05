var ICR360App = ICR360App || {};

ICR360App.QuestionsContentView = Backbone.Marionette.Layout.extend({
  template: jade.templates['questions_content_view'],
  tagName: "div",
  id: "content",
  regions: {
    vendorsNavigation: "#vendors_navigation",
    imageBackgroundContainer:"#image_background_container",
    profileVendorContainer: "#profile_vendor_container",
    contentRegion: ".content-new-tab",
    subVendorsNavigation: "#sub_vendors_navigation",
    parentContentBorder: "#content_border",
    flashContainer: "#flash"
  }
});