var aktiv = window.setInterval("CurrentTrack()", 5000);
var aktiv = window.setInterval("CurrentListeners()", 30000);
CurrentTrack();
CurrentListeners();
var currentTitle = "";
var request = "";
var engineturl = "";

function CurrentTrack() {
    $.get('http://theradio.cc:12011/', function(data) {
    	if (data != currentTitle) {
			$('span#nowPlaying').html(data);
			currentTitle = data;
		}
	});
}

function CurrentListeners() {
	$.getJSON('http://trcccounter.42cast.de/count.json', function(data) {
		var items = [];
			 $.each(data, function(key, val) {
				if (key == "listeners") {
				$('span#listeners').html(val);
				}
			});
	});
}

function play() {
	document.getElementById("audioplayer").play();
	document.getElementById("knopf").src = "stop.png";
	$('img#knopf').attr('onclick', 'pause()');
}

function pause() {
	document.getElementById("audioplayer").src = "";
	document.getElementById("audioplayer").src = "http://www.theradio.cc:8000/trcc-stream-nometadata.ogg";
	document.getElementById("audioplayer").pause();
	document.getElementById("knopf").src = "play.png";
	$('img#knopf').attr('onclick', 'play()');
}

function menu() {
	$('div#menu').toggleClass("hide");
	$('div#start').toggleClass("hide");
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
