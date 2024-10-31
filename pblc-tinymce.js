(function() {
    tinymce.create('tinymce.plugins.pcec_plugin', {
        init: function(editor, url) {
            /**
             * The editor parameter contains the TinyMCE editor instance.  The url
             * parameter contains the absolute url to the directory containing the
             * TinyMCE plugin file (this file's directory).
             */

            //  Specify button properties and commands.
            //  The first parameter of editor.addButton must be the button ID
            //  given in tinymce-dev-starter.php. In this case, it is tdsk_button.
            editor.addButton('pcec_button', {
                title: "PBLC's Chat Embed Creator",//    Tooltip when hovering over button.
                image: url + '/Public-Logo.png',    //    The image for the button
                cmd: 'pcec_command'                    //    The editor command to execute on button click.
            });

            //  Define the "command" executed on button click.
            editor.addCommand('pcec_command', function() {
                /**
                 * Stuff in here happens when button is clicked. Here, we want to open
                 * a dialog window
                 */

                editor.windowManager.open(
                    //  Properties of the window.
                    {
                        title: "PBLC's Chat Embed Creator",   //    The title of the dialog window.
                        file: url + '/pblc.html',      //    The HTML file with the dialog contents.
                        width: 600,                               //    The width of the dialog
                        height: 600,                              //    The height of the dialog
                        inline: 1                                 //    Whether to use modal dialog instead of separate browser window.
                    },

                    //  Parameters and arguments we want available to the window.
                    {
                        editor: editor,                   //    This is a reference to the current editor. We'll need this to insert the shortcode we create.
                    }
                );
            });
        }
    });
tinymce.PluginManager.add('pcec_plugin', tinymce.plugins.pcec_plugin);
})(jQuery);
