module Paperclip
  class Cropper < Thumbnail
    def transformation_command
      if crop_command
        # puts super.join(" ").sub(/ -crop \S+/, '')
        crop_command + super
      else
        super
      end
    end

    def crop_command
      target = @attachment.instance 
      if target.is_a?(User) or target.is_a?(Vendor)
        return [] if target.avatar.styles.detect{|key, value| 
            [:original, :other].index(key) and value[:geometry].to_s == @target_geometry.to_s
        }
      end
      if target.cropping?
        [
          "-crop",
          "#{target.crop_w}x" \
            "#{target.crop_h}+" \
            "#{target.crop_x}+" \
            "#{target.crop_y}"
        ]
        # " -crop #{target.crop_w}x#{target.crop_h}+#{target.crop_x}+#{target.crop_y}"
      end
    end
  end
end
