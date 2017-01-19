var app = {
  api:{
    suggest: "http://52.36.12.106/api/suggest/"
  },
  meaning: {
    content: '',
    pointer: 0,
    length: 0,
  },
  delimiter: ['*', '-', '=', '+'],
};

function getData(url, urlData) {
  return $.ajax({
    type: 'GET',
    url: url + urlData,
  });
}

// function findDefinition(){
//   var input = document.getElementById("word-search");
//   var word = input.value;
//   //console.log(word);
//   getWordDef(word);
// }

// function getWordDef(word){
//   var link = "http://52.36.12.106/api/search/word/" + word;
//   var xmlHttp = new XMLHttpRequest();

//       xmlHttp.open( "GET", link, false ); // false for synchronous request
//       xmlHttp.send( null );
//       var myArr = JSON.parse(xmlHttp.responseText);
//       displayDefinition(myArr);
//       console.log(xmlHttp.responseText);
//     }

    function parseEWord(word_input){
      var eWord = "";
      eWord = "<h2>"+ word_input + "<div class = \"glyphicon glyphicon-volume-up\" style=\"margin-left:6px;\" onclick = \"wordAudio();\"></div>" + "</h2>";
      return eWord;
    }

    function parsePronounce(pronounce_input){
      if(pronounce_input != ''){
        return "<div>[" +pronounce_input + "]</div>";
      }

    }

    function parseHeader(header_input){
      return "<h1>Nghĩa của từ " + "<i>" + header_input + "</i>" + ":</h1>";
    }

    function parseMeaning(meaning_input) {
      app.meaning.content = meaning_input;
      app.meaning.length = meaning_input.length;
      app.meaning.pointer = 0;
      var meanObj = app.meaning;
      var html = '';
      while(meanObj.pointer < meanObj.length) {
    // loop through each character
    switch (meanObj.content[meanObj.pointer++]) {
      case '-':
      html += getWordDefinition();
      break;
      case '*':
      html += getWordCategory();
      break;
      case '=':
      html += getExample();
      break;
      case '!':
      if (isLetter(meanObj.content[meanObj.pointer])){
        html += getPhrase();
      }
      break;
      default:
      meanObj.pointer++;
    }
  } // end while

  return html;
}

function getWordDefinition() {
  return '<div class="word-definition"> - ' + getToken() + '</div>';
}

function getWordCategory() {
  return '<div class="word-category">' + getToken() + '</div>';
}

function getExample() {
  var example = '<div class="word-example"><div><em>' + getToken() + '</em></div>';
  app.meaning.pointer++;
  var exampleMeaning = '<div>' + getToken() + '</div></div>';
  return example + exampleMeaning;
}

function getPhrase() {
  var phrase = '<div class="word-phrase word-definition"> + ' + getToken() + '</div>';
  app.meaning.pointer++;
  var phraseMeaning = getToken();
  console.log(phraseMeaning.search('(xem)'));
  if (phraseMeaning.search('(xem)') == 1) {
    // if first substring is xem
    var tokens = phraseMeaning.split(' ');
    phraseMeaning = '<div class="word-example"><em>(xem) <a href="#">' + tokens[1] + '</a></em></div>';
  } else {
    phraseMeaning = '<div class="word-example"><em>' + phraseMeaning + '</em></div>';
  }
  return phrase + phraseMeaning;
}

/**
 * check if the character is a delimiter
 */
 function isDelimiter(pointer) {
  var i = 0;
  var len = app.delimiter.length;
  if (app.meaning.content[pointer] === '!' && isLetter(app.meaning.content[pointer+1])) {
    // if it is a ! followed by a letter
    // it is a delimiter
    return true;
  }
  // loop through the array of delimiter
  for (i = 0; i < len; i++) {
    if (app.meaning.content[pointer] === app.delimiter[i]) {
      // if one delimiter is found
      // return true
      return true;
    }
  }

  return false;
}

/**
 * check if the character is a letter
 */
 function isLetter(ch) {
  if (ch.match(/[a-zA-Z]/i)) {
    return true;
  } else {
    return false;
  }
}

function getToken() {
  // mark the starting point
  var start = app.meaning.pointer;
  while(app.meaning.pointer < app.meaning.length &&
    !isDelimiter(app.meaning.pointer)) {
      // while the current char is not a delimiter and
      // pointer is less than length
      // move to the next character
      app.meaning.pointer++;
    }

    if(start == app.meaning.pointer ) {
    // nothing to substring
    return null;
  } else {
    var token = app.meaning.content.substring(start, app.meaning.pointer);
    return token.trim();
  }
}

    function displayDefinition(value){

      if(value.found == true){
        var word = value.word;
        //parse html of word
        var e_word = parseEWord(word.word);
        var pronounce = word.pronounce ? word.pronounce : '';
        //console.log(pronounce_value);
        pronounce = "<div>[" +pronounce + "]</div>"
        var meaning = parseMeaning(word.meaning);
        var header = parseHeader(word.word);
        var result = header + e_word + pronounce + meaning;
        document.getElementById("word_output").innerHTML = word.word;
        document.getElementById("word-definition").innerHTML = result;
        //showImage(word.word);
      }

      if(value.found == false){
        alert("No information about this word!")
      }
      document.getElementById("tracklist").innerHTML = "";
    }

    function runSearch(event){
      if(event.keyCode == 13){
        findDefinition();
      }
    }

    function showOption(){

    }

    /**
 * display the suggestions for the currently typing word
 */
 function suggest(typingWord) {
   getData(app.api.suggest,typingWord).done(displaySuggestions);
 }

/**
 * make html string for suggestion list
 */
 function displaySuggestions(data) {
   if (data && data.status) {
     // if getting suggestions successfully
     // display suggested words
     var words = data.words;
     var len = words.length;
     var i = 0;
     var html = '';

     for(i = 0; i < len; i++) {
       html += getSuggestionItem(words[i].word);
     }
     $('#suggest-box').css({"display": "block"});
     $('#suggest-box').html(html);
   }
 }

 function getSuggestionItem(word) {
   return '<div class="suggest-item"><a href="#" class="cross-ref-link">'+word+'</a></div>';
 }



