class BasePresenter
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    @user = user
    alias_action :create, :read, :update, :destroy, :to => :crud
    
    if user.admin?
      can :manage, [User, Role, Question, Gift, :dashboard]
    elsif user.trainer?
      can :crud, [QuizPool, TrainingActivity, QuizzesBulkImport, TrainingBatch, QuizPoolAnswerSet, PushMessage, InternalCheckListAnswerSet, :dashboard]
      can :view, [User]
      can :unlock, [User]
    elsif user.manager?
      can :crud, [QuizPoolAnswerSet, PushMessage, InternalCheckListAnswerSet, :dashboard]
      can :view, [User]
      can :unlock, [User]
    elsif user.coach?
      can :crud, [QuizPoolAnswerSet, PushMessage, InternalCheckListAnswerSet, :dashboard]
      can :view, [User]
      can :read, [WpcResourceFile]
      can :unlock, [User]
    elsif user.training_manager?
      can :crud, [TrainingBatch, QuizPool, QuizzesBulkImport, QuizPoolAnswerSet, PushMessage, InternalCheckListAnswerSet, :dashboard]
      can :view, [User]
      can :approve, [QuizPool]
      can :publish, [QuizPool]
      can :unlock, [User]
      
    elsif user.normal_user?
      can :crud, [Question, User]  
      can :read, [:dashboard, Gift]
    end
  end
  
  def current_user
    @user
  end
  
  def image_url_for(model, options = {})
    options.reverse_merge!(:image_style => :original)
    options.reverse_merge!(:attachment => :photo)

    attachment_path = model.send("#{options[:attachment].to_s}", options[:image_style]) if model.class.name.underscore != "photo"
    if model.send(options[:attachment]).present? and model.class.name.underscore != "photo" and attachment_path.present? and FileTest.exists?(attachment_path) == false
      model.send("#{options[:attachment]}=", nil)
    end
    
    model.send(options[:attachment]).url(options.delete(:image_style))
  end
end  