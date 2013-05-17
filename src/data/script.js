var aktiv = window.setInterval("CurrentTrack()", 5000);
var aktiv = window.setInterval("CurrentListeners()", 30000);
CurrentTrack();
CurrentListeners();
currentTitle = "";
schalter = false;

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
	if (schalter == false) {
	document.getElementById("audioplayer").play();
	document.getElementById("knopf").src = "stop.png";
	schalter = true;
	}
	else if (schalter == true) {
	document.getElementById("audioplayer").src = "";
	document.getElementById("audioplayer").src = "http://www.theradio.cc:8000/trcc-stream-nometadata.ogg";
	document.getElementById("knopf").src = "play.png";
	schalter = false;
	}
}

function menu() {
	if ($('div#menu').hasClass('hide') == true) {
	$('div#menu').removeClass("hide");
	$('div#start').addClass("hide");
	$('div#info').addClass("hide");
	}
	else if ($('div#start').hasClass('hide') == true) {
	$('div#menu').addClass("hide");
	$('div#start').removeClass("hide");
	$('div#info').addClass("hide");
	}
}