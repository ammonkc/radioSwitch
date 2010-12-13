/******************************************************* 
*  jQuery radioSwitch plugin v0.3                      *
*                                                      *
*  jquery.radioSwitch.js                               *
*  Author: Ammon Casey                                 *
*  Website: http://www.brokenparadigmlabs.com          *
*  Hosted: http://github.com/ammonkc/radioSwitch       *
*  Twitter: @ammonkc                                   *
*  Date: 12.13.2010                                    *
*                                                      *
*  Copyright (c) 2010, Ammon Casey                     *
*  licensed under the MIT license:                     *
*  http://www.opensource.org/licenses/mit-license.php  *
********************************************************/
(function($){
    jQuery.fn.radioSwitch = function(options, switched_callback) {
    	
    	// define default settings
    	var settings = {
    	    track_class: 'radioSwitch-track',
    	    handle_class: 'radioSwitch-handle',
    	    label_class: 'radioSwitch-label',
    		mouse_over: 'pointer',
    		mouse_out:  'default',
    		hide_radio: true,
    		sync_checked: true,
    		use_images: false,
    		speed: '250',
    		// Switch
    		width: 50,
    		height: 25,
    		radius: 4,
    		padding: 1,
    		// Track
    		track_img: 'images/switch_track.png',
    		track_bg_color: '#5f6777',
    		track_dropshadow_color: 'rgba(255, 255, 255, 0.15)',
    		// Handle
    		handle_img: 'images/switch_handle.png',
    		handle_bg_color: '#f9f9f9',
    		handle_border_color: '#d0d0d0',
    		// Labels
    		label_text_color: "#ffffff",
    		label_font_size: 12
    	};
    
    	if(options) {
    		jQuery.extend(settings, options);
    	}
    	    
    	// create the switch
    	return this.each(function() {
    	    // Check that this contains radio buttons
    		if (!jQuery(this).find(':radio').length) { return; }
    		
    		var container = jQuery(this);
    		var radios = container.find(':radio');
    		var labels = container.find('label');
    		var checkd = radios.filter(':checked');
    		var count  = radios.length;
    		var state = 0;
    		var track;
    		var handle;
    		var track_bg;
    		var handle_bg;
    		var handle_txt = '';
			// dimensions 
			var track_width = settings.width * count;
			var handle_radius = settings.radius -1;
    		
    		// Hide the checkbox
    		if (settings.hide_radio) {radios.hide();}    		
    		
    		state = radios.index(checkd);
    		handle_txt = container.find('label[for="'+checkd.attr('id')+'"]').text();
    		
    		// use images 
    		if (settings.use_images) {
    			track_bg = 'url('+settings.track_img+')';
    			handle_bg = 'url('+settings.handle_img+')';
				track_padding = settings.track_padding;
    		}else{
    			track_bg = settings.track_bg_color;
    			handle_bg = settings.handle_bg_color;
    			// tweak padding for css only version
    			track_padding = settings.track_padding + 1;
    		}
    		
    		// Positions
    		var offset = track_width - (settings.width * state) + settings.width;
    		var left   = (settings.width * state) + settings.padding;
    		var handle_display = (state == -1 ? 'none' : 'block');
    		
    		/**** make the container ****/
    		container.css({
	                     'width':track_width + (settings.padding * 2),
	                     'height':settings.height + (settings.padding * 2),
	                     'position':'relative',
	                     'overflow':'hidden',
	                     'font':"normal normal normal 12px/18px 'Lucida Grande', Verdana, sans-serif",
	                     'padding':'0 0 1px 0'
	                     });
    		/**** make the track ****/
    		track = jQuery('<div />')
    		            .addClass(settings.track_class)
    		            .css({
    		                'width':track_width,
    		                'height':settings.height,
    		                'position':'absolute',
    		                'background-color':settings.track_bg_color,
    		                'background-image':track_bg,
    		                'background-repeat':'no-repeat',
    		                'padding':settings.padding,
    		                'z-index':'1'
    		                });
    		
    		/**** Make the handle ****/
    		handle = jQuery('<div />')
    		            .addClass(settings.handle_class)
    		            .text(handle_txt)
    		            .css({
    		                'width':settings.width,
    		                'height':settings.height,
    		                'left':left,
    		                'top':1,
    		                'bottom':1,
    		                'position':'absolute',
    		                'display':handle_display,
    		                'line-height':settings.height+'px',
    		                'background-image':handle_bg,
    		                'background-repeat':'no-repeat',
    		                'color':'#333',
    		                'z-index':'3'
    		                });
    		labels.css({
    		           'width':settings.width,
    		           'height':settings.height,
    		           'line-height':settings.height+'px',
    		           'float':'left',
    		           'text-align':'center',
    		           'color':'#fff',
    		           'font-size':settings.label_font_size,
    		           'z-index':'2'
    		           });
    		// CSS3 - imagless 
    		if (!settings.use_images) {
    			track.css({
    					'background-color':settings.track_bg_color,
    					'-webkit-border-radius':settings.radius,
    					'-moz-border-radius':settings.radius,
    					'border-radius':settings.radius,
    					'-webkit-box-shadow': settings.track_dropshadow_color + ' 0px 1px 1px, rgba(1, 1, 1, 0.65) 0px 3px 6px inset',
    					'-moz-box-shadow': settings.track_dropshadow_color + ' 0px 1px 1px, rgba(1, 1, 1, 0.65) 0px 3px 6px inset',
    					'box-shadow': settings.track_dropshadow_color + ' 0px 1px 1px, rgba(1, 1, 1, 0.65) 0px 3px 6px inset',
    					'-webkit-background-clip':'padding-box',
    					'background-clip':'padding-box'
    					});
    			handle.css({
    					'background':'-moz-linear-gradient(-90deg, #fcfcfc, #e6e6e6)',
    					'background-image':'-webkit-gradient(linear, 0% 0%, 0% 100%, from(#fcfcfc), to(#e6e6e6))',
    					'background-color':settings.handle_bg_color,
    					'-webkit-border-radius':handle_radius,
    					'-moz-border-radius':handle_radius,
    					'border-radius':handle_radius,
    					'-webkit-box-shadow':'rgba(255,255,255,1) 0px 0px 3px inset, rgba(0, 0, 0, 0.99) 0px 0px 3px',
    					'-moz-box-shadow':'rgba(255,255,255,1) 0px 0px 3px inset, rgba(0, 0, 0, 0.99) 0px 0px 3px',
    					'box-shadow':'rgba(255,255,255,1) 0px 0px 3px inset, rgba(0, 0, 0, 0.99) 0px 0px 3px',
    					'-webkit-background-clip':'padding-box',
    					'background-clip':'padding-box'
    					});
    		}
    		
    		container.wrapInner(track)
    		         .find('.' + settings.track_class)
    		             .append(handle);
    		
    		// click handling
    		container.find('label').click(function() {
    		    var myLabel     = jQuery(this);
    		    var myContainer = myLabel.parent();
    		    var myRadio     = myContainer.find('#' + myLabel.attr('for'));
    		    var myHandle    = myContainer.find('.' + settings.handle_class);
    		        state       = radios.index(myRadio);
    		    // Positions
    		    var position_left = (settings.width * state);
    		    var offset = ((track_width - position_left) - settings.width);
    		        position_left = position_left + settings.padding;
    		        offset = offset + settings.padding;
    		        display_handle = (state == -1 ? 'none' : 'block');
    		    // Values    
    		    myRadio.attr('checked', true)
    		           .trigger('change');
    		    myHandle.animate({left:position_left,right:offset}, settings.speed, function() {
    		              jQuery(this).text(myLabel.text());
        		          if(typeof switched_callback == 'function'){
        		              switched_callback.call(this, data);
        		          }
        		      })
        		       .css({display:display_handle});
    		});
    
    	});	
    }
})(jQuery);