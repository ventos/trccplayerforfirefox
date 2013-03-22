var aktiv = window.setInterval("getCurrentTrack()", 5000);
getCurrentTrack();
currentTitle = "";
schalter = false;
menuschalter = false;

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
    if (menuschalter == false) {
        $('div#menu').removeClass("hide");
        $('div#titlesec').addClass("hide");
        $('div#info').addClass("hide");
        menuschalter = true;
    }
    else if (menuschalter = true) {
        $('div#menu').addClass("hide");
        $('div#titlesec').removeClass("hide");
        $('div#info').addClass("hide");
        menuschalter = false;
    }
}

/* function info() {
    $('div#menu').addClass("hide");
    $('div#titlesec').addClass("hide");
    $('div#info').removeClass("hide");
} */