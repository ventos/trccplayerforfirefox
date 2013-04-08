var aktiv = window.setInterval("getCurrentTrack()", 5000);
getCurrentTrack();
currentTitle = "";
schalter = false;

function getCurrentTrack() {
	$.get('http://theradio.cc:12011/', function(data) {
		if (data != currentTitle) {
			$('span#nowPlaying').html(data);
			currentTitle = data;
		}
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
	$('div#titlesec').addClass("hide");
	$('div#info').addClass("hide");
	}
	else if ($('div#titlesec').hasClass('hide') == true) {
	$('div#menu').addClass("hide");
	$('div#titlesec').removeClass("hide");
	$('div#info').addClass("hide");
	}
}