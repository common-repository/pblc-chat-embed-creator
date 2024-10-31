<?php

/*
 * Exit if file accessed directly
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
// PCEC - PBLC Chat Embed Creator
//  Absolute path to plugin's root directory in file system.
define ( 'PCEC_ROOT_PATH', plugin_dir_path( __FILE__ ) );

//  URL to the plugin's root directory.
define( 'PCEC_ROOT_URL', plugin_dir_url( __FILE__ ) );

//  Absolute path to the main plugin file (this one).
define( 'PCEC_PLUGIN_FILE', PCEC_ROOT_PATH . 'index.php' );

add_shortcode( 'pcec-shortcode-creator', 'pcec_create_shortcode' );

/*
 * The function handler for the tdsk-dumb-shortcode shortcode.
 * @param  ARRAY_A $attributes An array of all attributes passed to the shortcode.
 * @return string              The HTML to output in place of the shortcode.
 */
function pcec_create_shortcode( $attributes ) {
    if( !array_key_exists( 'text', $attributes ) ) {
        $text_to_display = "No text provided in shortcode.";
    }
    else {
        $text_to_display = $attributes['text'];
    }

    return '<span style="color: #900;">' . $text_to_display . '</span>';
}

add_filter( 'mce_buttons', 'pcec_register_blue_whale_button' ); // so it can be located in first row

function pcec_register_blue_whale_button( $button_array ) {
    global $current_screen; //  WordPress contextual information about where we are.

    $type = $current_screen->post_type;

    if( is_admin() && ( $type == 'post' || $type == 'page' ) ) {
        //  Okay, our conditions for showing the button have been met. Therefore,
        //  we need to tack on the new button ID to the button array.
        array_push( $button_array, 'pcec_button' );
    }

    return $button_array;
}


add_filter( 'mce_external_plugins', 'pcec_plugin_activator' );


function pcec_plugin_activator( $plugin_array ) {
   global $current_screen; //  WordPress contextual information about where we are.

    $type = $current_screen->post_type;

    if( is_admin() && ( $type == 'post' || $type == 'page' ) ) {
        //  Okay, our conditions for registering the plugin have been met. Therefore,
        //  we need to tack on the new plugin file to the plugin array.
        $plugin_array['pcec_plugin'] = PCEC_ROOT_URL . 'pblc-tinymce.js';
    }

    return $plugin_array;
}
