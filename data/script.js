var t1 = window.setInterval("currentSong()", 5000);
//var t2 = window.setInterval("currentListeners()", 30000);
var currentTitle = "";
currentSong();
//currentListeners();

function currentSong() {
	$.get('http://theradio.cc:12011/', function(data) {
            if (data != currentTitle) {
                $('span#np').html(data);
                currentTitle = data;
            }
        });
}

/*function currentListeners() {
        jQuery.get("http://counter.theradio.cc/count.json", function(data, textStatus, jqXHR) {
          jQuery("#listeners").html(data["listeners"]);
        });
}*/

function play() {
        document.getElementById("audio").play();
        document.getElementById("knopf").src = "stop.png";
        $('img#knopf').attr('onclick', 'pause()');
}

function pause() {
        document.getElementById("audio").src = "";
        document.getElementById("audio").src = "http://ogg.theradio.cc";
        document.getElementById("audio").pause();
        document.getElementById("knopf").src = "play.png";
        $('img#knopf').attr('onclick', 'play()');
}

function menu() {
        $('div#menu').toggleClass("hide");
        $('div#landing').toggleClass("hide");
}

function search(engine) {
        switch (engine) {
                case "google":
                        engineturl = "https://www.google.de/search?q=";
                        break;
                case "jamendo":
                        engineturl = "https://www.jamendo.com/de/search?qs=q=";
                        break;
                case "bandcamp":
                        engineturl = "https://bandcamp.com/search?q=";
                        break;
        }
        request = currentTitle;
        if (request.startsWith(" - ") == true) {
                request = request.substr(3);
        }
        window.open(engineturl + request, '_blank');
}

$(window).keydown(function(e) {
    switch (e.keyCode) {
        case 89:
                play();
            return false;
        case 88:
                        pause();
                        return false;
                case 71:
                        search("google");
                        return false;
                case 74:
                        search("jamendo");
                        return false;
                case 66:
                        search("bandcamp");
                        return false;
    }
    return;
});

