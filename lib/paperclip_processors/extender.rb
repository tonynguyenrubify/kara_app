module Paperclip
  class Extender < Thumbnail
    def transformation_command
      if extend_command
        super + extend_command
      else
        super
      end
    end

    def extend_command
      unless @attachment.instance.cropping?
        [
          " -gravity center -extent",
          "#{target_geometry.width}x" \
          "#{target_geometry.height}"
        ]
        # " -crop #{target.crop_w}x#{target.crop_h}+#{target.crop_x}+#{target.crop_y}"
        # " -gravity center -extent #{target_geometry.width}x#{target_geometry.height}"
      end
    end
  end
end
