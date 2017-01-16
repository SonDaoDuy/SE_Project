
    function findDefinition(){
      var input = document.getElementById("word-search");
      var word = input.value;
      console.log(word);
      getWordDefinition(word);
    }

    function getWordDefinition(word){
      var link = "http://52.36.12.106/api/search/word/" + word;
      var xmlHttp = new XMLHttpRequest();

      xmlHttp.open( "GET", link, false ); // false for synchronous request
      xmlHttp.send( null );
      var myArr = JSON.parse(xmlHttp.responseText);
      displayDefinition(myArr);
      console.log(xmlHttp.responseText);
    }

    function parseEWord(word_input){
      var eWord = "";
      eWord = "<h2>"+ word_input + "<div class = \"glyphicon glyphicon-volume-up\" style=\"margin-left:6px;\" onclick = \"wordAudio();\"></div>" + "</h2>";
      return eWord;
    }

    function parsePronounce(pronounce_input){
      return pronounce_input;
    }

    function parseMeaning(meaning_input){
      return meaning_input;
    }

    function parseHeader(header_input){
      return "<h1>Nghĩa của từ " + "<i>" + header_input + "</i>" + ":</h1>";
    }

    function displayDefinition(value){

      if(value.status == true){
        var word = value.word;
        //parse html of word
        var e_word = parseEWord(word.word);
        var pronounce = parsePronounce(word.pronounce);
        var meaning = parseMeaning(word.meaning);
        var header = parseHeader(word.word);
        var result = header + e_word + pronounce + "<br>" + meaning;
        document.getElementById("word_output").innerHTML = word.word;
        document.getElementById("word-definition").innerHTML = result;
        //showImage(word.word);
      }

      if(value.status == false){

      }

    }

    function runSearch(event){
      if(event.keyCode == 13){
        findDefinition();
      }
    }

    function showOption(){

    }