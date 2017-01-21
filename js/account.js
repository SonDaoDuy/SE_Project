var params = {
    email: "sam@sam.com",
    password: "sam123"
};

//var params = "email=sam@sam.com&password=sam123";

var token = "";
//var method = "POST";
var login_url = "http://52.36.12.106/api/auth/login";
var logout_url = "http://52.36.12.106/api/auth/logout";
var signup_url = "http://52.36.12.106/api/auth/signup";
var tracking_url = "http://52.36.12.106/api/tracking";
//var cleantrack_url = "http://52.36.12.106/api/tracking"

function validateLogin(){
    params.email = document.getElementById('account-place').value;
    params.password = document.getElementById('password-place').value;

    var sent_data = "email="+params.email+"&"+"password="+params.password;
    var request = new XMLHttpRequest();
    request.onload = function () {
       var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
       var data = JSON.parse(request.responseText); // Returned data, e.g., an HTML document.
       if(data.status){
        token = data.token;
        $('#log-in').css({"display": "none"});
        $('#after-login').css({"display": "block"});
    }
    else{
        alert("Please fill correct information!");
    }
}

request.open("POST", login_url, true);

request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

// Actually sends the request to the server.
request.send(sent_data);
}

function logout(){
    var request = new XMLHttpRequest();
    request.onload = function () {
       var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
       var data = JSON.parse(request.responseText); // Returned data, e.g., an HTML document.
       if(data.status){
        token = "";
        $('#log-in').css({"display": "block"});
        $('#after-login').css({"display": "none"});
            //clear all content function here
            document.getElementById("word-definition").innerHTML = "";
            document.getElementById("word_output").innerHTML = "";
            document.getElementById("tracklist").innerHTML = "";
        }
    }
    //var sent_data = "token="+token;
    request.open("GET", logout_url, true);
    request.setRequestHeader("token",token);
    request.send(null);
}

function displayHistory(){
    var request = new XMLHttpRequest();
    request.onload = function () {
       var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
       var data = JSON.parse(request.responseText); // Returned data, e.g., an HTML document.
       var result = "";
       result += "<button class=\"btn btn-default\" onclick=\"cleanTrackList();\" style=\"margin: 10px\">Clear History<\/button>";
        result += "      <ul  id=\"word_track_list\" class=\"list group\">";

       if(data.status){
        var track_list = data.trackingList.list;
        for(var k in track_list){
            result += "  <li value=\""+k+"\" class=\"list-group-item\">";
            result += "    <span class=\"badge\">"+track_list[k]+"<\/span>";
            result += "    "+k;
            result += "  <\/li>";
        }
        result += "      <\/ul>";
        document.getElementById("word-definition").innerHTML = "";
        document.getElementById("word_output").innerHTML = "";
        document.getElementById("tracklist").innerHTML = result;
    }
}
    //var sent_data = "?token="+token;
    request.open("GET", tracking_url, false);
    request.setRequestHeader("token",token);
    request.send(null);
}

function validateSignup(){
    var name = document.getElementById("account-name").value;
    var email = document.getElementById("account-email").value;
    var password = document.getElementById("account-password").value;

    if(name == "" || email == "" || password == ""){
        alert("Please fill correct information!");
        return;
    }

    var sent_data = "name=" + name +"&email="+email+"&"+"password="+password;
    var request = new XMLHttpRequest();
    request.onload = function () {
       var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
       var data = JSON.parse(request.responseText); // Returned data, e.g., an HTML document.
       if(data.status){
        alert("Succesffully create new account!");
    }
    else{
        alert("Cannot create account, try again later!");
    }
}

    request.open("POST", signup_url, true);

    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

    // Actually sends the request to the server.
    request.send(sent_data);
}

function findMeaningFromTrack(track_value){
  //document.getElementById("word_track_list").innerHTML = "";
  getWordDef(track_value);
}

function findDefinition(){
  var input = document.getElementById("word-search");
  var word = input.value;
  //console.log(word);
  getWordDef(word);
    document.getElementById("tracklist").innerHTML = "";
}

function getWordDef(word){
  var link = "http://52.36.12.106/api/search/word/" + word;
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open( "GET", link, false ); // false for synchronous request
  if(token != ""){
    xmlHttp.setRequestHeader("token",token);
  }
  xmlHttp.send( null );
  var myArr = JSON.parse(xmlHttp.responseText);
  displayDefinition(myArr);
  console.log(xmlHttp.responseText);
}

function cleanTrackList(){
    var request = new XMLHttpRequest();
    request.onload = function () {
       var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
       var data = JSON.parse(request.responseText); // Returned data, e.g., an HTML document.
       if(data.status){
            //clear all content function here
            alert(data.message);
            document.getElementById("word-definition").innerHTML = "";
            document.getElementById("word_output").innerHTML = "";
            document.getElementById("tracklist").innerHTML = "";
        }
    }
    //var sent_data = "token="+token;
    request.open("DELETE", tracking_url, false);
    request.setRequestHeader("token",token);
    request.send(null);
}
