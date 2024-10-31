<?php
/*
Plugin Name: PBLC Chat Embed Creator
Plugin URI:   https://wordpress.org/plugins/pblc-chat-embed-creator/
Description: Allows you to embed a chat from Public into a Wordpress blog
Version:     1.0.2
Author:      PBLC, Inc.
Author URI:  https://public.chat/
License:     GPLv2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Domain Path: /languages
Text Domain: my-toolset
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}



/*
 * Include plugin files and combine both files
 */
include_once ( plugin_dir_path( __FILE__ ) . 'embedshortcode.php' );      // Add Embed file
include_once ( plugin_dir_path( __FILE__ ) . 'tinymce.php' );     // Add TinyMCE plugin
