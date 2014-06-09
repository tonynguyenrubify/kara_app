var ICR360App = ICR360App || {};

ICR360App.ActivityView = Backbone.Marionette.ItemView.extend({
  template: jade.templates['latest_activity'],
  tagName: "div",
  className: "activity dashboard",
  id: function() {
    return "activity_" + this.model.get("id");
  },
  updateTimeAgo: function() {
    $('abbr.timeago').timeago();
  },
  onShow: function() {
    this.updateTimeAgo();
  }
});

ICR360App.JoinGroupActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['join_group_activity']
});

ICR360App.CreateDocumentActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_document']
});

ICR360App.CreateAssetActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_asset']
});

ICR360App.OnSceneCommentActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['on_scene_comment'],
  ui: {
    contentOnSceneComment: ".content"
  },
  onShow: function() {
    this.bindUIElements();
    this.ui.contentOnSceneComment.find('blockquote:not(:has(.description)), .story, .description, .body').filter(':not(:has(.condense_control))').truncateHtml({
      max_length: 150,
      more: "Load more",
      less: "Show less"
    }); 
  }
});

ICR360App.AcceptContactRequestActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['accept_contact_request_activity']
});

ICR360App.CreateAnnouncementActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_announcement']
});

ICR360App.CreateLikeActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_like']
});

ICR360App.CreateWishActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_wish']
});

ICR360App.CreateCommentForAnswerActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['comment_create_for_answer']
});

ICR360App.CreateCommentForQuestionActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['comment_create_for_question']
});

ICR360App.CreateCommentActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_comment'],
  ui: {
    btnShowDiscussion: "a.show-content-discussion",
    btnHideDiscussion: "a.hide-content-discussion",
    discussionContainer: ".discussions-section",
    btnShowAllComment: ".view-all-comments-activity",
    btnHideAllComment: ".show-less-comments-activity",
    commentContainer: ".discussions-comments-section",
    commentListingContainer: ".comments-container",
    secondLevelDiscussionFormContainer: ".second_level_discussion_form",
    commentBody: "#comment_body_input textarea",
    labelInput: "#new_comment #comment_body_input label.label.over",
    contentCreateComment: ".content"
  },
  
  events: {
    "click a.show-content-discussion": "showDiscussion",
    "click a.hide-content-discussion": "hideDiscussion",
    "click .view-all-comments-activity": "showAllComment",
    "click .show-less-comments-activity": "hideAllComment",
    "click #comment_submit_action input.share": "submitNewComment"
  },
  
  onShow: function() {
    this.bindUIElements();
    this.commentCollection = new ICR360App.Comments(this.model.get("comments"));
    var commentCollectionView = new ICR360App.ActivityCommentCollectionView({collection: this.commentCollection});
    this.ui.commentListingContainer.html(commentCollectionView.render().el);
    this.ui.labelInput.labelOver('over', "");
    this.ui.commentBody.autoResize({ extraSpace: 0 }); 
    
    this.ui.contentCreateComment.find('blockquote:not(:has(.description)), .story, .description, .body').filter(':not(:has(.condense_control))').truncateHtml({
      max_length: 150,
      more: "Load more",
      less: "Show less"
    });   
  },
  
  showDiscussion: function(event) {
    event.preventDefault();
    this.ui.discussionContainer.show();
    this.ui.commentContainer.show();
    this._setCollectionVisibility(false);
    this.ui.secondLevelDiscussionFormContainer.show();
    this.ui.btnShowDiscussion.hide();
    this.ui.btnHideDiscussion.show();
    
    
    return false;
  },
  
  hideDiscussion: function(event) {
    event.preventDefault();
    this.ui.discussionContainer.hide();
    this.ui.commentContainer.hide();
    this.ui.secondLevelDiscussionFormContainer.hide(); 
    this.ui.btnShowDiscussion.show();
    this.ui.btnHideDiscussion.hide();
    this._setCollectionVisibility(false);       
    return false;
  },
  
  showAllComment: function(event) {
    event.preventDefault();
    this._setCollectionVisibility(true);
    this.ui.btnShowAllComment.hide();
    this.ui.btnHideAllComment.show();
    this.updateTimeAgo();
    return false;
  },
  
  _setCollectionVisibility: function(visible) {
    _.each(this.commentCollection.models, function(el) {     
      el.set("visible", visible);
    }, this);
    this.commentCollection.trigger("reRender");
  },  
  
  hideAllComment: function(event) {
    event.preventDefault();
    this._setCollectionVisibility(false);
    this.ui.btnShowAllComment.show();
    this.ui.btnHideAllComment.hide();    
    return false;
  },
  
  submitNewComment: function(event) {
    event.preventDefault();
    var _this = this;
    var comment = new ICR360App.Comment({
      commentable_id: this.model.get("commentable_id"), 
      commentable_type: this.model.get("commentable_type"),
      body: this.ui.commentBody.val()
    });
    
    comment.url = '/api/comments?create_comment_from_activity=true';
    comment.save(comment.attributes, {
      success: function() {
        comment.set("visible", true);
        _this.commentCollection.add(comment);
        _this.ui.commentBody.val("");
        _this.ui.commentBody.focus();
        _this.ui.commentBody.blur();
        _this.ui.commentBody.css("height", "39px");
        _this.ui.labelInput.labelOver('over', "");
        _this.ui.commentBody.autoResize({ extraSpace: 0 });
               
        _this.updateTimeAgo();
      },
      error: function(model, response) {
        var errors = $.parseJSON(response.responseText).errors;
        alert(errors);
      }
    });
    
    return false;
  }
  
});

ICR360App.CreateCommentForDiscussionableActivityView = ICR360App.CreateCommentActivityView.extend({
  template: jade.templates['comment_create_for_discussionable']
});


ICR360App.CreateAnswerActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_answer'],
  ui: {
    contentAnswer: ".answer-container-in-quetion",
    questionContainer: ".question-answers-section",
    btnShow: "a.show-content-answer",
    btnHide: "a.hide-content-answer",
    answerContainer: ".answer-container-in-quetion",
    btnShowAllAnswer: ".view-all-answers-activity",
    btnHideAllAnswer: ".show-less-answers-activity",
    answerBody: "#answer_body",
    followButton: "#follow_button a",
    addYourAnswer: "#answer_submit_action input"
  },
  
  events: {
    "click a.show-content-answer": 'showAnswer',
    "click a.hide-content-answer": 'hideAnswer',
    "click a.stop-follow-this-question": "stopFollowQuestion",
    "click a.follow-this-question": "followQuestion",
    "click div.view-all-answers-activity": "showAllAnswer",
    "click div.show-less-answers-activity": "hideAllAnswer",
    "click #answer_submit_action input": "submitNewAnswer"
  },
  
  onShow: function() {
    this.bindUIElements();
    this.answerCollection = new ICR360App.Answers(this.model.get("answers"));
    var createAnswerCollectionView = new ICR360App.CreateAnswerCollectionView({collection: this.answerCollection});
    this.ui.contentAnswer.html(createAnswerCollectionView.render().el);
    this.ui.answerBody.autoResize({ extraSpace: 0 });
  },
  
  showAnswer: function(event) {
    event.preventDefault();
    this.ui.btnShow.hide();
    this.ui.btnHide.show();
    this.ui.questionContainer.show();
    return false;
  },
  
  hideAnswer: function(event) {
    event.preventDefault();
    this.ui.btnShow.show();
    this.ui.btnHide.hide();
    this.ui.questionContainer.hide();
    return false;
  },
  
  stopFollowQuestion: function(event) {
    event.preventDefault();
    var showAllAnswerModel = new ICR360App.Answer();
    showAllAnswerModel.url = '/api/questions/' + this.model.get("question_id") + '/stop_follow_this_question';
    var _this = this;
    showAllAnswerModel.fetch({
      success: function() {
        _this.ui.followButton.removeClass("stop-follow-this-question").addClass("follow-this-question");
        _this.ui.followButton.attr("title", "Follow this question. Following allows you to receive email updates when a member posts an answer.");
      }
    });
    return false;
  },
  
  followQuestion: function(event) {
    var _this = this;
    event.preventDefault();
    var showAllAnswerModel = new ICR360App.Answer();
    showAllAnswerModel.url = '/api/questions/' + this.model.get("question_id") + '/follow_this_question';
    showAllAnswerModel.fetch({
      success: function() {
        _this.ui.followButton.addClass("stop-follow-this-question").removeClass("follow-this-question");
        _this.ui.followButton.attr("title", "Stop following this question");
      }
    });
    return false;
  },
  
  _setCollectionVisibility: function(visible) {
    _.each(this.answerCollection.models, function(el) {     
      el.set("visible", visible);
    }, this);
    this.answerCollection.trigger("reRender");
  },
  
  showAllAnswer: function(event) {
    event.preventDefault();
    this._setCollectionVisibility(true);
    this.ui.btnShowAllAnswer.hide();
    this.ui.btnHideAllAnswer.show();
    return false;
  },
  
  hideAllAnswer: function(event) {
    event.preventDefault();
    this._setCollectionVisibility(false);
    this.ui.btnShowAllAnswer.show();
    this.ui.btnHideAllAnswer.hide();
    return false;
  },
  
  submitNewAnswer: function(event) {
    event.preventDefault();
    var _this = this;
    var submitAnswerModel = new ICR360App.Answer({
      question_id: this.model.get("question_id"), 
      body: this.ui.answerBody.val()
    });
    
    _this.ui.addYourAnswer.attr('disabled', 'disabled');
    submitAnswerModel.url = '/api/answers/create_answer_from_activity';
    submitAnswerModel.save(submitAnswerModel.attributes, {
      success: function(model, response) {
        submitAnswerModel.set("visible", true);
        _this.ui.answerBody.val("");
        _this.updateTimeAgo();
        _this.ui.addYourAnswer.removeAttr('disabled');
        
        if (typeof(response.result) != "undefined" && response.result == "failed") {
          alert("Duplicate content is detected!");
        } else {
          _this.answerCollection.add(submitAnswerModel);
        }
      }
    });
    
    return false;
  }
});

ICR360App.CreateQuestionActivityView = ICR360App.CreateAnswerActivityView.extend({
  template: jade.templates['create_question'],
  ui: {
    contentCreateQuestion: ".content",
    contentAnswer: ".answer-container-in-quetion",
    questionContainer: ".question-answers-section",
    btnShow: "a.show-content-answer",
    btnHide: "a.hide-content-answer",
    answerContainer: ".answer-container-in-quetion",
    btnShowAllAnswer: ".view-all-answers-activity",
    btnHideAllAnswer: ".show-less-answers-activity",
    answerBody: "#answer_body",
    followButton: "#follow_button a",
    addYourAnswer: "#answer_submit_action input"
  },
  
  onShow: function() {
    this.bindUIElements();    
    this.answerCollection = new ICR360App.Answers(this.model.get("answers"));
    var createAnswerCollectionView = new ICR360App.CreateAnswerCollectionView({collection: this.answerCollection});
    this.ui.contentAnswer.html(createAnswerCollectionView.render().el);
    this.ui.answerBody.autoResize({ extraSpace: 0 });
    this.ui.contentCreateQuestion.find('blockquote:not(:has(.description)), .story, .description, .body').filter(':not(:has(.condense_control))').truncateHtml({
      max_length: 150,
      more: "Load more",
      less: "Show less"
    });   
  }
});

ICR360App.CreateJobActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_job']
});

ICR360App.UpdateJobActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['update_job']
});

ICR360App.RelistJobActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['relist_job']
});

ICR360App.CreateCrisisActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_crisis'],
  events: {
    "click a.participate-this-crisis": "participateInCrisis",
    "click a.stop-participate-this-crisis": "stopParticipatingInCrisis"
  },
  
  ui: {
    participateButton: "#join_leave a"
  },  
  
  participateInCrisis: function(event) {
    event.preventDefault();
    var crisisParticipation = new ICR360App.CrisisParticipation();
    crisisParticipation.url = '/api/crises/' + this.model.get("crisis_id") + '/join';
    var _this = this;
    crisisParticipation.fetch({
      type: "PUT",
      success: function() {
        _this.ui.participateButton.removeClass("participate-this-crisis").addClass("stop-participate-this-crisis");
      }
    });
    return false;
  },
  
  stopParticipatingInCrisis: function(event) {
    event.preventDefault();
    var crisisParticipation = new ICR360App.CrisisParticipation();
    crisisParticipation.url = '/api/crises/' + this.model.get("crisis_id") + '/leave';
    var _this = this;
    crisisParticipation.fetch({
      type: "PUT",
      success: function() {
        _this.ui.participateButton.removeClass("stop-participate-this-crisis").addClass("participate-this-crisis");
      }
    });
    return false;
  }
  
});

ICR360App.UpdateCrisisActivityView = ICR360App.CreateCrisisActivityView.extend({
  template: jade.templates['update_crisis']
});

ICR360App.CloseCrisisActivityView = ICR360App.CreateCrisisActivityView.extend({
  template: jade.templates['close_crisis']
});

ICR360App.JoinCrisisActivityView = ICR360App.CreateCrisisActivityView.extend({
  template: jade.templates['join_crisis']
});

ICR360App.ReopenCrisisActivityView = ICR360App.CreateCrisisActivityView.extend({
  template: jade.templates['reopen_crisis']
});

ICR360App.UpdatePollCrisisActivityView = ICR360App.CreateCrisisActivityView.extend({
  template: jade.templates['update_poll_crisis']
});

ICR360App.CreateHotelActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_hotel'] 
});

ICR360App.UpdateHotelActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['update_hotel']
});

ICR360App.CreatePhotoActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_photo']
});

ICR360App.CreateVendorActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_vendor']
});

ICR360App.EventActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['activity_event']
});

ICR360App.CreateStaffActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_staff']
});

ICR360App.CreateStoryActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_story'],
  className: "activity dashboard story",
  id: function() {
    return "story_" + this.model.get("story_id");
  },
  
  ui: {
    commentContainer: ".second_level_comments",
    commentBody: "textarea.story-cid-body",
    labelInput: "li#comment_body_input.text.input.optional label.label.over",
    photoOfUserComment: "form.single_text.second_level.formtastic.comment .photo",
    buttonOfUserComment: "form.single_text.second_level.formtastic.comment fieldset.buttons",
    contentOfUserComment: "form.single_text.second_level.formtastic.comment .content",
    textareaOfUserComment: "form.single_text.second_level.formtastic.comment .content textarea.story-cid-body",
    contentLinkExtract: ".content-link-extract",
    shareContentLink: ".share-content-link",
    shareImageLink: ".share-image-link",
    storyTitleLinkShareInput: "#story_title_link_share",
    storyHostLinkShareInput: "#story_host_link_share",
    storySummaryLinkShareInput: "#story_summary_link_share",
    storyUrlImageLinkShareInput: "#story_url_image_link_share",
    linkExtractClose: ".link-extract-close",
    titleLinkExtract: "#title_link_extract",
    subtitleLinkExtract: "#subtitle_link_extract",
    summaryLinkExtract: "#summary_link_extract",
    inputShowImageLinkExtract: "#input_show_image_link_extract",
    linkExtractImage: "#link_extract_image" 
  },
  
  events: {
    "focus textarea.story-cid-body": "focusTextArea",
    "blur textarea.story-cid-body": "unFocusTextArea",
    "click input.create": "submitNewComment",
    "click li.cancel a": "cancelTextArea",
    "click a.delete-story": "deleteStory"
  },
  
  onShow: function() {
    this.bindUIElements();
    this.commentCollection = new ICR360App.Comments(this.model.get("comments"));
    var createCommentCollectionView = new ICR360App.CreateCommentCollectionView({collection: this.commentCollection});
    this.ui.commentContainer.html(createCommentCollectionView.render().el);
    this.ui.commentBody.autoResize({ extraSpace: 0 });
    this.ui.labelInput.labelOver('over');
  },
  
  focusTextArea: function(event) {
    event.preventDefault();
    this.ui.photoOfUserComment.show();
    this.ui.buttonOfUserComment.show();
    this.ui.textareaOfUserComment.css({'width':'416px'});
    this.ui.contentOfUserComment.removeClass("collapsed");
    return false;
  },
  
  unFocusTextArea: function(event) {
    event.preventDefault();
    if(!this.ui.commentBody.val()) {
      this.ui.photoOfUserComment.hide();
      this.ui.buttonOfUserComment.hide();
      this.ui.textareaOfUserComment.css({'width':'456px'});
      this.ui.contentOfUserComment.addClass("collapsed");
    }
    return false;
  },
  
  cancelTextArea: function(event) {
    event.preventDefault();
    this.ui.photoOfUserComment.hide();
    this.ui.buttonOfUserComment.hide();
    this.ui.contentOfUserComment.addClass("collapsed");
    return false;
  },
  submitNewComment: function(event) {
    event.preventDefault();
    var _this = this;
    var submitCommentModel = new ICR360App.Comment({
      commentable_id: this.model.get("story_id"),
      commentable_type: "Story",
      body: this.ui.commentBody.val()
    });
    
    submitCommentModel.urlRoot = '/api/comments?create_comment_from_activity=true';
    submitCommentModel.save({}, {
      success: function() {
        submitCommentModel.set("visible", true);
        _this.commentCollection.add(submitCommentModel);
        _this.ui.commentBody.val("");
      },
      error: function(model, response) {
        var errors = $.parseJSON(response.responseText).errors;
        alert(errors);
      }
    });
    
    return false;
  },
  
  deleteStory: function(event) {
    event.preventDefault();
    var story = new ICR360App.UserStory({id: this.model.get("story_id")});
    var _this = this;
    story.destroy({
      success: function() {
        _this.remove();
      }
    });
    return false;
  }
});

ICR360App.NewsFeedActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['activity_news_feed'],
  className: "dashboard new_feed",
  id: function() {
    return "new_feed_" + this.model.get("news_feed_id");
  }
});

ICR360App.EarthquakeFeedActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['activity_earthquake_feed'],
  className: "dashboard earthquake_feed",
  id: function() {
    return "earthquake_feed_" + this.model.get("earthquake_feed_id");
  }
});

ICR360App.OutbreakFeedActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['activity_outbreak_feed'],
  className: "dashboard outbreak_feed",
  id: function() {
    return "outbreak_feed_" + this.model.get("outbreak_feed_id");
  }
});

ICR360App.TravelFeedActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['activity_travel_feed'],
  className: "dashboard travel_feed",
  id: function() {
    return "travel_feed_" + this.model.get("travel_feed_id");
  }
});

ICR360App.UpdateProfileVendorActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['update_profile_vendor']
});

ICR360App.UpdateContactDetailsVendorActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['update_contact_details_vendor']
});

ICR360App.UpdateVendorActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['update_vendor']
});

ICR360App.CreateVendorServiceActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_vendor_service']
});

ICR360App.CreateVendorProductActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_vendor_product']
});

ICR360App.CreateTestimonialActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['create_testimonial']
});

ICR360App.VendorNewsActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['activity_vendor_news']
});

ICR360App.OnSceneResourceActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['activity_on_scene_resource']
});

ICR360App.StoryCommentActivityView = ICR360App.ActivityView.extend({
  template: jade.templates['activity_story_comment']
});

ICR360App.ActivitiesView = Backbone.Marionette.CollectionView.extend({
  tagName: "div",
  id: "activities",
  className: "object_list",
  itemView: ICR360App.ActivityView,
  initialize: function() {
    this.listenTo(this.collection, "change", this.render, this);
    this.listenTo(this.collection, "prepend", this.prependItem, this);
  },
    
  prependItem: function(item) {
    var itemView = this.buildItemView(item, ICR360App.ActivityView, {});
    this.$el.prepend(itemView.render().el);
    itemView.$el.css({opacity: 0}).animate({opacity: 1}, function() {
      $('abbr.timeago').timeago();
      itemView.onShow();
    });
  },
    
  buildItemView: function(item, ItemViewType, itemViewOptions){
    var index = this.collection.indexOf(item);
    var options = _.extend({model: item}, itemViewOptions, {});
    if(item.get("activity_type") == "JoinGroup") {
      var view = new ICR360App.JoinGroupActivityView(options);
    }//end if
    else if(item.get("activity_type") == "AcceptContactRequest") {
      var view = new ICR360App.AcceptContactRequestActivityView(options);
    }//end if    
    else if(item.get("activity_type") == "CreateAnnouncement") {
      var view = new ICR360App.CreateAnnouncementActivityView(options);
    }//end if
    else if(item.get("activity_type") == "CreateLike") {
      var view = new ICR360App.CreateLikeActivityView(options);
    }//end if
    else if(item.get("activity_type") == "CreateWish") {
      var view = new ICR360App.CreateWishActivityView(options);
    }//end if
    else if(item.get("activity_type") == "CreateQuestion") {
      var view = new ICR360App.CreateQuestionActivityView(options);
    }//end if
    else if(item.get("activity_type") == "CreateJob") {
      var view = new ICR360App.CreateJobActivityView(options);
    }//end if
    else if(item.get("activity_type") == "UpdateJob") {
      var view = new ICR360App.UpdateJobActivityView(options);
    }//end if
    else if(item.get("activity_type") == "RelistJob") {
      var view = new ICR360App.RelistJobActivityView(options);
    }//end if
    else if(item.get("activity_type") == "CreateCrisis") {
      var view = new ICR360App.CreateCrisisActivityView(options);
    }//end if
    else if(item.get("activity_type") == "UpdateCrisis") {
      var view = new ICR360App.UpdateCrisisActivityView(options);
    }//end if
    else if(item.get("activity_type") == "CloseCrisis") {
      var view = new ICR360App.CloseCrisisActivityView(options);
    }//end if        
    else if(item.get("activity_type") == "JoinCrisis") {
      var view = new ICR360App.JoinCrisisActivityView(options);
    }//end if        
    else if(item.get("activity_type") == "ReopenCrisis") {
      var view = new ICR360App.ReopenCrisisActivityView(options);
    }//end if
    else if(item.get("activity_type") == "UpdatePollCrisis") {
      var view = new ICR360App.UpdatePollCrisisActivityView(options);
    }//end if
    else if(item.get("activity_type") == "CreateQuestion") {
      var view = new ICR360App.CreateQuestionActivityView(options);
    }//end if
    else if(item.get("activity_type") == "CreateHotel") {
      var view = new ICR360App.CreateHotelActivityView(options);
    }//end if
    else if(item.get("activity_type") == "UpdateHotel") {
      var view = new ICR360App.UpdateHotelActivityView(options);
    }//end if
    else if(item.get("activity_type") == "CreatePhoto") {
      var view = new ICR360App.CreatePhotoActivityView(options);
    }//end if    
    else if(item.get("activity_type") == "CreateDocument") {
      var view = new ICR360App.CreateDocumentActivityView(options);
    }//end if        
    else if(item.get("activity_type") == "CreateAsset") {
      var view = new ICR360App.CreateAssetActivityView(options);
    }//end if            
    else if(item.get("activity_type") == "CreateVendor") {
      var view = new ICR360App.CreateVendorActivityView(options);
    }//end if
    else if(item.get("activity_type") == "Event") {
      var view = new ICR360App.EventActivityView(options);
    }//end if
    else if(item.get("activity_type") == "CreateCommentForAnswer") {
      var view = new ICR360App.CreateCommentForAnswerActivityView(options);
    }//end if
    else if(item.get("activity_type") == "CreateCommentForQuestion") {
      var view = new ICR360App.CreateCommentForQuestionActivityView(options);
    }//end if    
    else if(item.get("activity_type") == "CreateCommentForDiscussionable") {
      var view = new ICR360App.CreateCommentForDiscussionableActivityView(options);
    }//end if            
    else if(item.get("activity_type") == "CreateStaff") {
      var view = new ICR360App.CreateStaffActivityView(options);
    }//end if
    else if(item.get("activity_type") == "CreateStory") {
      var view = new ICR360App.CreateStoryActivityView(options);
    }//end if
    else if(item.get("activity_type") == "NewsFeed") {
      var view = new ICR360App.NewsFeedActivityView(options);
    }//end if
    else if(item.get("activity_type") == "VendorNews") {
      var view = new ICR360App.VendorNewsActivityView(options);
    }//end if
    else if(item.get("activity_type") == "EarthquakeFeed") {
      var view = new ICR360App.EarthquakeFeedActivityView(options);
    }//end if
    else if(item.get("activity_type") == "OutbreakFeed") {
      var view = new ICR360App.OutbreakFeedActivityView(options);
    }//end if
    else if(item.get("activity_type") == "TravelFeed") {
      var view = new ICR360App.TravelFeedActivityView(options);
    }//end if
    else if(item.get("activity_type") == "CreateTestimonial") {
      var view = new ICR360App.CreateTestimonialActivityView(options);      
    }//end if    
    else if(item.get("activity_type") == "OnSceneResource") {
      var view = new ICR360App.OnSceneResourceActivityView(options);
    }//end if
    else if(item.get("activity_type") == "OnSceneComment") {
      var view = new ICR360App.OnSceneCommentActivityView(options);
    }//end if
    
    else if(item.get("activity_type") == "StoryComment") {
      var view = new ICR360App.StoryCommentActivityView(options);      
    }//end if    
    
    else if(item.get("activity_type") == "CreateVendorService") {
      var view = new ICR360App.CreateVendorServiceActivityView(options);      
    }//end if
    
    else if(item.get("activity_type") == "CreateVendorProduct") {
      var view = new ICR360App.CreateVendorProductActivityView(options);      
    }//end if
    
    else if(item.get("activity_type") == "UpdateVendor") {
      var view = new ICR360App.UpdateVendorActivityView(options);      
    }//end if
    
    else if(item.get("activity_type") == "UpdateContactDetailsVendor") {
      var view = new ICR360App.UpdateContactDetailsVendorActivityView(options);      
    }//end if
    
    else if(item.get("activity_type") == "UpdateProfileVendor") {
      var view = new ICR360App.UpdateProfileVendorActivityView(options);      
    }//end if
      
    else {
      var view = new ItemViewType(options);
    }//end else
    
    // var className = "ICR360App." + item.get("activity_type") + "ActivityView";
    // var view = new window[className](options);
    return view;
  },
    
  onShow: function() {
    $('abbr.timeago').timeago();
  }
});