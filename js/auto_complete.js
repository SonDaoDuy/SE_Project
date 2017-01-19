// when user types on search box
  $(document).on("keyup", 'input[name="search-place"]', function (e) {
    if (e.which == 13) {
      // when user press enter button,
      // search word
      // hide the suggest box
      $('#suggest-box').css({"display": "none"});
      findDefinition();
    } else {
      // get suggestions
      var typingWord = $('input[name="search-place"]').val();
      if (typingWord) {
        // if the value of input box is not empty
        // get the suggestions
        suggest(typingWord);
      } else {
        $('#suggest-box').css({"display": "none"});
      }
    }
  });

  $(document).on("click", ".cross-ref-link", function () {
    var word = $(this).html();
    $('input[name="search-place"]').val(word);
    $('#suggest-box').css({"display": "none"});
    getWordDef(word);
  });

  $(document).on("click", function (e) {
    $('#suggest-box').hide();
  });