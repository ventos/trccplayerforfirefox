var t1 = window.setInterval("currentSong()", 5000);
var t2 = window.setInterval("currentListeners()", 30000);
var currentTitle = "";
var broadcast = false;
currentSong();
currentListeners();

function currentSong() {
    $.get('http://theradio.cc:12011/', function(data) {
            if (data != currentTitle) {
                var display = data;
                if (data.startsWith("- ") == true) {
                    display = data.substr(2);
                    broadcast = true;
                } else if (data.startsWith(" - ") == true) {
                    display = data.substr(3);
                    broadcast = true;
                } else {
                    broadcast = false;
                }
                $('span#np').html(display);
                currentTitle = data;
                if (broadcast == true) {
                    if ($("#sendung").hasClass("hide")) {
                        $("#sendung").removeClass("hide");
                    }
                } else if (broadcast == false) {
                    if ($("#sendung").hasClass("hide") == false) {
                        $("#sendung").addClass("hide");
                    }
                }
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

function OLDmenu() {
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

function fadeOut(time) {
    $("#canvas").animate({
        left: "-170px"
    }, time, function() {});
}
function fadeIn(time) {
    $("#canvas").animate({
        left: "0"
    }, time, function() {});
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

// Document Ready
$(function() {
    $("#add").click(function() {
        if (!$("#add").hasClass("added")) {
            $("#add").css("font-size", "30px");
            $("#add").animate({
                "font-size": "20px"
            }, 400, function() {});
        }
        $("#add").toggleClass("added");
    });

    $("#mbtn").click(function() {
        if ($("#canvas").css("left") == "-170px") {
            fadeIn(600);
        } else {
            fadeOut(600);
        }
    });
});
