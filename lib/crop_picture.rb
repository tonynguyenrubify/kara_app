module CropPicture
  def self.included(base)
    base.extend(CropPictureMethods)
  end

  module CropPictureMethods
    def crop_picture(attachment)
      extend ClassMethods
      include InstanceMethods

      attr_accessor *crop_attributes

      # after_update :"reprocess_#{attachment}", :if => :cropping?

      define_method "#{attachment}_geometry" do |style=nil|
        style ||= :original
        @geometry ||= {}
        photo_path = (self.send(attachment).options[:storage] == :s3) ? self.send(attachment).url(style) : self.send(attachment).path(style)
        @geometry[style] ||= if photo_path.present?
          Paperclip::Geometry.from_file(photo_path)
        else
          Paperclip::Geometry.parse(self.send(attachment).styles[style][:geometry])
          # "150x200"
        end
      end

      define_method "reprocess_#{attachment}" do
        if cropping?
          target = self.send(attachment)
          target.reprocess!
        end
      end
      
      define_method "#{attachment}_style_path" do |style|
        style ||= :original
        path = (self.send(attachment).options[:storage] == :s3) ? self.send(attachment).url(style) : self.send(attachment).path(style)
      end
    end
  end

  module ClassMethods
    CROP_ATTRIBUTES = [:crop_x, :crop_y, :crop_w, :crop_h].freeze

    def crop_attributes
      CROP_ATTRIBUTES
    end
  end

  module InstanceMethods
    def cropping?
      self.crop_x.present? && self.crop_y.present? && self.crop_w.present? && self.crop_h.present?
    end
  end
end