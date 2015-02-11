/**
 * Layers JS file
 *
 * This file contains all theme JS functions, from height matching to button toggling
 *
 * @package Layers
 * @since Layers 1.0
 * Contents
 * 1 - Screen height matching
 * 2 - Container padding for header fixed
 * 3 - Widget closing when clicking on the canvas
 * 4 - Offsite sidebar Toggles
 * 5 - Sticky Header
 *
 * Author: Obox Themes
 * Author URI: http://www.oboxthemes.com/
 * License: GNU General Public License v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/
jQuery(function($) {

    /**
    * 1 - Screen Height Matching
    */

    $(window).resize(function(){
        layers_match_to_screen_height();
    });

    layers_match_to_screen_height();

    function layers_match_to_screen_height(){
        $( '.full-screen' ).css( 'height' , $(window).height() );
        $( '.full-screen' ).find( '.swiper-slide .overlay' ).css( 'height' , $(window).height() );
    }

    /**
    * 2 - Container padding for header fixed
    */
    $(window).on('load', function() {
        
        //Set the header.
        $header = $( '.header-site' );
        
        if( $header.hasClass( 'header-overlay' ) ){
            
            //Set the site wrapper.
            $site_wrapper = $( '#wrapper-content' );

            // Check if first widget is slider.
            if( $site_wrapper.find( '.widget' ).first().hasClass( 'slide' ) ) {
                
                // Add body class if first widget is slider.
                $('body').addClass('layers-slide-first');
                
                // Pad the slides to compensate for overlay header.
                $('.swiper-slide .overlay').css( 'paddingTop' , $( $header ).height() );
            }
            else{
                // Add body class if first widget is slider.
                $('body').addClass('layers-slide-not-first');
                
                // Pad the site to compensate for overlay header.
                $site_wrapper.css( 'paddingTop' , $( $header ).height() );
            }

        }
    });

    /**
    * 3 - Widget Closing when clicking on the canvas
    */
    $(document).on( 'click' , 'html, body'  , function(e){
        // Close widgets
        $(window.parent.document).find( '.control-panel-content .widget-rendered.expanded' ).removeClass( 'expanded' );
    });

    /**
    * 4 - Offsite sidebar Toggles
    */
    $(document).on( 'click' , '[data-toggle^="#"]'  , function(e){
        e.preventDefault();

        // "Hi Mom"
        $that = $(this);

        // Setup target ID
        $target = $that.data( 'toggle' );

        // Toggle .open class
        $( $target ).toggleClass( $that.data( 'toggle-class' ) );

    });

    /**
    * 5 - Sticky Header
    */

    // Set site header element
    $header_sticky = $("header.header-sticky");

	// Handle scroll passsing the go-sticky position.
	$("body").waypoint({
		offset 	: -270,
		handler	: function(direction) {
			if ( 'down' == direction ) {

				// Sticky the header
				$header_sticky.stick_in_parent({
					parent: 'body'
				});

				// Clear previous timeout to avoid duplicates.
				clearTimeout( $header_sticky.data( 'timeout' ) );

				// Show header miliseconds later so we can css animate in.
				$header_sticky.data( 'timeout', setTimeout( function() {
					$header_sticky.addClass('is_stuck_show');
				}, '10' ) );
			}
		}
	});

	// Handle scroll ariving at page top.
	$("body").waypoint({
		offset 	: -1,
		handler	: function(direction) {
			if ( 'up' == direction ) {

				// Clear previous timeout to avoid late events.
				clearTimeout( $header_sticky.data( 'timeout' ) );

				// Detach the header
				$header_sticky.removeClass('is_stuck_show');
				$header_sticky.trigger("sticky_kit:detach");
			}
		}
	});

}(jQuery));

