(function() {
  "use strict";
  var jqContext = document.getElementsByTagName("body")[0];
  var $dropdownContent = $(".dropdown-content", jqContext);
  var passedArguments = top.tinymce.activeEditor.windowManager.getParams();
  var DEFAULT_MAX_DIMENSION = "700";
  var DEFAULT_MIN_DIMENSION = "560";
  var EMBED_URL = "https://embed.public.chat/";
  var API_URL = "https://public.chat/v1/";
  var $embedHeight = $("#height_value", jqContext);
  var $embedWidth = $("#width_value", jqContext);
  var $searchChat = $("#search_chat", jqContext);
  var $portrait = $(".embed-template.portrait", jqContext);
  var $landscape = $(".embed-template.landscape", jqContext);
  var $square = $(".embed-template.square", jqContext);
  $embedHeight.val(DEFAULT_MAX_DIMENSION); // when pressing the public button, start off with the first option
  $embedWidth.val(DEFAULT_MIN_DIMENSION); // automatically at 700 by 560

  function searchChatHandle(keywordSearch) {
    var xmlhttp = new XMLHttpRequest();
    var url = API_URL + "search?t=" + keywordSearch + "&fields=chats";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = processRequest;
    function processRequest(e) {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var searchResults = JSON.parse(xmlhttp.responseText); // this variable is used to convert JSON text into a Javscript object
            dropdownMenu(searchResults);
        }
    }
  }
  function dropdownMenu(searchResults) {
    var i;
    $dropdownContent.css('visibility', 'hidden').empty();
    for (i = 0; i < searchResults.result.chats.length; i++) {
      var handle = searchResults.result.chats[i].handle;
      $dropdownContent.append('<span class="spantext">' + handle + '</span>').css('visibility', 'visible'); // print chat handles in dropdown list
      $('.spantext').click(function() {
          document.getElementById('search_chat').value = $(this).html();
          $dropdownContent.css('visibility', 'hidden').empty();
      });
      if($searchChat.value == "") {
        $dropdownContent.css('visibility', 'hidden').empty();
      }
    }
  }

  $searchChat.on('keyup cut copy paste', function() { // search functionality
    searchChatHandle(this.value);
  });
  // default height and width options, click on each box to find height and width
  $('.HW-Rectangle', jqContext).click(function() {
    $(".embed-template").removeClass("active");
  });
  $portrait.click(function() {
    $portrait.addClass("active");
    $(".embed-template.landscape, .embed-template.square").removeClass("active");
    $embedHeight.val(DEFAULT_MAX_DIMENSION);
    $embedWidth.val(DEFAULT_MIN_DIMENSION);
  });
  $landscape.click(function() {
    $landscape.addClass("active");
    $(".embed-template.portrait, .embed-template.square").removeClass("active");
    $embedHeight.val(DEFAULT_MIN_DIMENSION);
    $embedWidth.val(DEFAULT_MAX_DIMENSION);
  });
  $square.click(function() {
    $square.addClass("active");
    $(".embed-template.landscape, .embed-template.portrait").removeClass("active");
    $embedHeight.val(DEFAULT_MIN_DIMENSION);
    $embedWidth.val(DEFAULT_MIN_DIMENSION);
  });

  function constructEmbedUrl() {
    var chatHandle = $searchChat.val();
    var height = $embedHeight.val();
    var width = $embedWidth.val();
    var embedcode = '[iframe src="' + EMBED_URL;
    //  Do we have a value in the input?
    if( chatHandle != "" ) {
        //  Yes, we do. Add the text argument to the shortcode.
        embedcode += chatHandle + '" height = "' + height + '" width = "' + width + '"';
    }
    //  Close the shortcode
    return embedcode += ']';
  }
  function insertEmbedCodeIntoEditor() {
    passedArguments.editor.selection.setContent(constructEmbedUrl());
  }
  function closeChatEmbedWindow() {
    passedArguments.editor.windowManager.close();
  }

  $("form", jqContext).submit(function(event) {
          event.preventDefault();
          //  Insert the shortcode into the editor
          insertEmbedCodeIntoEditor();
          // close the chat embed window
          closeChatEmbedWindow();

  });
})();
