var t1 = window.setInterval("currentSong()", 5000);
var t2 = window.setInterval("currentListeners()", 30000);
var currentTitle = "";
currentSong();
currentListeners();

function currentSong() {
	$.get('http://theradio.cc:12011/', function(data) {
            if (data != currentTitle) {
                var display = data;
                if (data.startsWith("- ") == true) {
                    display = data.substr(2);
                } else if (data.startsWith(" - ") == true) {
                    display = data.substr(3);
                }
                $('span#np').html(display);
                currentTitle = data;
            }
        });
}

function currentListeners() {
        $.get("http://counter.theradio.cc/count.json", function(data) {
          $("#listeners").html(data["listeners"]);
        });
}

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
        } else if (request.startsWith("- ") == true) {
				request = request.substr(2);
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
