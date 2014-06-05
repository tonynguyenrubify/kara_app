// http://remysharp.com/2007/03/19/a-few-more-jquery-plugins-crop-labelover-and-pluck/#labelOver

jQuery.fn.labelOver = function(overClass, context) {
	return this.each(function(){
		var label = jQuery(this);
		var f = label.attr('for');
		var dom = this;
		if (f) {
		  var input = null;
		  if(typeof(context) == "undefined") {
        input = jQuery('#' + f);
		  }//end if
		  else {
		    input = jQuery(context + ' #' + f);
		  }//end else

			this.hide = function() {
			  label.css({ left: '-10000px' })
			}

			this.show = function() {
			  if (input.val() == '') label.css({ left: '' })
			}
			
			dom.hide = this.hide;

			// handlers
			input.focus(this.hide);
			input.blur(this.show);
		  label.addClass(overClass).click(function(){ 
				input.focus();
				dom.hide;
				return false;
			});
			input.focus(this.hide);
			input.blur(this.show);
			
			if (input.val() != '') this.hide();
		}
	})
};


jQuery.fn.hintOver = function(overClass) {
	return this.each(function(){
		var hint = jQuery(this);
		var f = hint.text();
		if (f) {
			var input = jQuery(this).siblings(':text');

			this.hide = function() {
			  hint.css({ left: '-10000px' })
			}

			this.show = function() {
			  if (input.val() == '') hint.css({ left: '' })
			}

			// handlers
			input.focus(this.hide);
			input.blur(this.show);
			hint.addClass(overClass).click(function(){ input.focus() });

			if (input.val() != '') this.hide();
		}
	})
};
