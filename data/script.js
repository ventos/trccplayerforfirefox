var t1 = window.setInterval("currentSong()", 5000);
var t2 = window.setInterval("currentListeners()", 30000);
var currentTitle = "";
var broadcast = false;
var Song;
var Songs = new Array();
initWishlist();
currentSong();
currentListeners();

function currentSong() {
    $.get('http://theradio.cc:12011/', function(data) {
            if (data != currentTitle) {
                if (isInWishlist(data)) {
                    if (!$("#add").hasClass("added")) {
                        $("#add").addClass("added");
                    }
                } else {
                    if ($("#add").hasClass("added")) {
                        $("#add").removeClass("added");
                    }
                }
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
    $('div#about').toggleClass("hide");
    $('div#landing').toggleClass("hide");
}

function offCanvas(id) {
    $("#menuPlayer").removeClass("menuactive");
    $("#menuWishlist").removeClass("menuactive");
    $("#menuAbout").removeClass("menuactive");
    $(id).addClass("menuactive");
}

function page(id) {
    switch(id) {
        case "#landing":
            var mainID = "#landing";
            var secondID = "#wishlist";
            var thirdID = "#about";
            break;
        case "#wishlist":
            var mainID = "#wishlist";
            var secondID = "#about";
            var thirdID = "#landing";
            break;
        case "#about":
            var mainID = "#about";
            var secondID = "#landing";
            var thirdID = "#wishlist";
            break;
    }
    if (!$(mainID).hasClass("hide")) {
        //Dann passt alles, also nichts tun
    } else if (!$(secondID).hasClass("hide")) {
        $(mainID).removeClass("hide");
        $(secondID).addClass("hide");
        // Und dem dritten brauch ich auch nichts tun, weil des is ja dann schon versteckt, also passt da auch alles
    } else if (!$(thirdID).hasClass("hide")) {
        $(mainID).removeClass("hide");
        // Diesmal sollte es beim zeiten passen
        $(thirdID).addClass("hide");
    }
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
            addSong();
        } else {
            removeSong(currentTitle);
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
    $("#menuPlayer").click(function() {
        offCanvas("#menuPlayer");
        page("#landing");
        fadeIn(600);
    });
    $("#menuWishlist").click(function() {
        offCanvas("#menuWishlist");
        page("#wishlist");
        fadeIn(600);
    });
    $("#menuAbout").click(function() {
        offCanvas("#menuAbout");
        page("#about");
        fadeIn(600);
    });
    $("#deleteWish").click(function() {
        localStorage.removeItem("trccplayer-wishlist");
        fadeIn(600);
    });
});

function addSong() {
    if (!isInWishlist(currentTitle)) {
        // IF NOT in wishlist then we will add that
        console.log("DEBUG: ADD");
        if (localStorage.getItem("trccplayer-wishlist") == null) {
           Song = "$@%" + currentTitle + "\n";
        } else {
           Song = localStorage.getItem("trccplayer-wishlist") + "$@%" + currentTitle + "\n";
        }
        localStorage.setItem("trccplayer-wishlist", Song);
        $("#wishlist").html(localStorage.getItem("trccplayer-wishlist"));
        console.log("Length Songs[]: " + Songs.length);
        Songs[Songs.length] = currentTitle;
    } // ELSE nothing to do
}

function removeSong(songToRemove) {
    if (isInWishlist(songToRemove)) {
        /* Vor Replace §$§ hhinzufügen, weil er sonst nicht entferenen kann,
         und dannach wenn vorhanden, also for split wieder entferenen */
        var SongString  = "§$§" + Songs.join("§$§");
            console.log("SongString:" + SongString);
        var searchthing = "§$§" + songToRemove;
        SongString = SongString.replace(searchthing, "");
            console.log("DEBUG: Dings:" + SongString);
        if (SongString.startsWith("§$§")) {
            SongString = SongString.substr(3);
        }
        var SongSplit = SongString.split("§$§");
        Songs = new Array();
        for (var i = 0; i < SongSplit.length; i++) {
            var c = (i - 1);
            Songs[c] = SongSplit[i];
            console.log("DEBUG:" + Songs[c]);
        };
       Save();
    } else {
        // Nothing to remove
        console.log("DEBUG: NOTHING TO REMOVE");
    }
}

function initWishlist() {
    // Init the Array with the Songs stored in the localStorage
    if (localStorage.getItem("trccplayer-wishlist") != null) {
        var wishlistItems = localStorage.getItem("trccplayer-wishlist");

        var wishlistItemsLength = (wishlistItems.split("$@%").length - 1);
        console.log("DEBUG:" + wishlistItemsLength + " Songs are on the wishlist");
        var splitted = wishlistItems.split("$@%");
        for (var i = 1; i <= wishlistItemsLength; i++) {
            var c = (i - 1);
            Songs[c] = splitted[i].substr(0, splitted[i].length - 1);
            console.log("DEBUG:" + Songs[c]);
        };
    }
    // ELSE: nothing to do, there are no songs on the wishlist

}

function isInWishlist(checkthing) {
    // Check if the String to check is already in the wishlist
    var EverythingInAString = Songs.join(" ");
    return (EverythingInAString.indexOf(checkthing) > -1);
}

function Save() {
    var songtmp = "$@%" + Songs.join("\n$@%");
    songtmp = songtmp.substr(0, songtmp.length - 3);
    localStorage.setItem("trccplayer-wishlist", songtmp);
}