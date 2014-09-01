var t1 = window.setInterval("currentSong()", 5000);
var t2 = window.setInterval("currentListeners()", 30000);
var currentTitle = "";
var broadcast = false;
var Song;
var Songs = new Array();
var lastttl = "TheRadio.CC - Player";
initWishlist();
currentSong();
currentListeners();

function currentSong() {
    $.get('http://theradio.cc:12011/', function(data) {
            if (data != currentTitle) {
                if (data.startsWith("- ") == true) {
                    currentTitle = data.substr(2);
                    broadcast = true;
                } else if (data.startsWith(" - ") == true) {
                    currentTitle = data.substr(3);
                    broadcast = true;
                } else {
                    currentTitle = data;
                    broadcast = false;
                }
                if (isInWishlist(currentTitle)) {
                    if (!$("#add").hasClass("added")) {
                        $("#add").addClass("added");
                    }
                } else {
                    if ($("#add").hasClass("added")) {
                        $("#add").removeClass("added");
                    }
                }
                if (broadcast == true) {
                    if ($("#sendung").hasClass("hide")) {
                        $("#sendung").removeClass("hide");
                    }
                } else if (broadcast == false) {
                    if ($("#sendung").hasClass("hide") == false) {
                        $("#sendung").addClass("hide");
                    }
                }
                np = currentTitle.split(" - ");
                artist = np[0];
                song = np.join(" - ").substr(artist.length + 3);
                $('#curTitle').html(song);
                $('span#curArtist').html(artist);
                var n = $("#curTitle").height() + 14;
                $("#curArtist").css("top", n + "px");
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
        window.open(engineturl + currentTitle, '_blank');
}

/******** VOLUME ********/

function volume(mode) {
    var currentVolume = parseInt($("#ls").html());
    switch (mode) {
        case "up":
            if (currentVolume <= 80) {
                n = currentVolume + 20;
                changeVol(n, currentVolume);
            }
            break;
        case "down":
            if (currentVolume >= 20) {
                n = currentVolume - 20;
                changeVol(n, currentVolume);
            }
            break;
        case "max":
            changeVol(100, currentVolume);
            break;
        case "min":
            changeVol(0, currentVolume);
            break;
    }
}

function changeVol(to, old) {
    if (old == 0 && to > 0) {
        $("#vol").removeClass("mute");
    } else if (old > 0 && to == 0) {
        $("#vol").addClass("mute");
    }
    // Ugly way, but calculating in js sucks
    audi = document.getElementById("audio");
    switch(to) {
        case 0:
            audi.volume = 0;
            break;
        case 20:
            audi.volume = 0.2;
            break;
        case 40:
            audi.volume = 0.4;
            break;
        case 60:
            audi.volume = 0.6;
            break;
        case 80:
            audi.volume = 0.8;
            break;
        case 100:
            audi.volume = 1;
            break;
    }
    $("#ls").html(to);
}

/*******************/

/**** SHORTCUTS ****/

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
        case 107:
            volume("up");
            return false;
        case 109:
            volume("down");
            return false;
        case 54:
            volume("min");
            return false;
        case 55:
            volume("max");
            return false;
        case 56:
            volume("down");
            return false;
        case 57:
            volume("up");
            return false;
        case 106:
            volume("max");
            return false;
        case 111:
            volume("min");
            return false;
    }
    return;
});

/********************/

// Document Ready
$(function() {
    $("#add").click(function() {
        if (!$("#add").hasClass("added")) {
            addSong();
            $("#add").toggleClass("added");
        } else {
            removeSong(currentTitle);
        }
        render();
    });

    $("#mbtn").click(function() {
        if ($("#offcanvas").css("left") == "-170px") {
            fadeIn(400);
        } else {
            fadeOut(400);
        }
    });
    $("#menuPlayer").click(function() {
        offCanvas("#menuPlayer");
        page("#landing");
        fadeOut(400);
        npup();
        setTitle("TheRadio.CC - Player");
    });
    $("#menuWishlist").click(function() {
        offCanvas("#menuWishlist");
        page("#wishlist");
        render();
        fadeOut(400);
        npdown();
        setTitle("Merkliste");
    });
    $("#menuAbout").click(function() {
        offCanvas("#menuAbout");
        page("#about");
        fadeOut(400);
        npdown();
        setTitle("&Uuml;ber");
    });
    $("#menuShortcuts").click(function() {
        offCanvas("#menuShortcuts");
        page("#shortcuts");
        fadeOut(400);
        npdown();
        setTitle("Tastaturk&uuml;rzel");
    });
    $("#play").click(function() {
        if (!$("#play").hasClass("pause")) {
            $("#play").addClass("pause");
            document.getElementById("audio").play();
        } else {
            $("#play").removeClass("pause");
            document.getElementById("audio").src = "";
            document.getElementById("audio").src = "http://ogg.theradio.cc";
            document.getElementById("audio").pause();
        }
    });
    $("#weg").click(function() {
        if ($("#weg").hasClass("up")) {
            npup();
        } else {
            npdown();
        }
    });
});

function npup() {
    if ($("#weg").hasClass("up")) {
        $("#weg").removeClass("up");
        $("#weg").addClass("down");
        $("#status").animate({
            height: "184px"
        }, 400, function() {});
    }
}

function npdown () {
    if (!$("#weg").hasClass("up")) {
        $("#weg").addClass("up");
        $("#weg").removeClass("down");
        $("#status").animate({
            height: "26px"
        }, 400, function() {});
    }
}

function setTitle(name) {
    titletmp = $("#title").html();
    if (name == "prev") {
        $("#title").html(lastttl);
    } else {
        $("#title").html(name);
    }
    lastttl = titletmp;
}

/*********** ANIMATION STUFF (MENU) ***********/
/**********************************************/

function offCanvas(id) {
    $("#menuPlayer").removeClass("menuactive");
    $("#menuWishlist").removeClass("menuactive");
    $("#menuAbout").removeClass("menuactive");
    $("#menuShortcuts").removeClass("menuactive");
    $(id).addClass("menuactive");
}

function page(id) {
    switch(id) {
        case "#landing":
            var mainID = "#landing";
            var secondID = "#wishlist";
            var thirdID = "#about";
            var fourthID = "#shortcuts";
            break;
        case "#wishlist":
            var mainID = "#wishlist";
            var secondID = "#about";
            var thirdID = "#shortcuts";
            var fourthID = "#landing";
            break;
        case "#about":
            var mainID = "#about";
            var secondID = "#shortcuts";
            var thirdID = "#landing";
            var fourthID = "#wishlist";
            break;
        case "#shortcuts":
            var mainID = "#shortcuts";
            var secondID = "#landing";
            var thirdID = "#wishlist";
            var fourthID = "#about";
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
    } else if (!$(fourthID).hasClass("hide")) {
        $(mainID).removeClass("hide");
        $(fourthID).addClass("hide");
        // Hier wieder nach dem Prizip: das was da war kommt weg, und das was wird brauchen kommt her :)
    }
}

function fadeIn(time) {
    setTitle("Men&uuml;");
    $("#offcanvas").animate({
        left: "0px"
    }, time, function() {});
}
function fadeOut(time) {
    setTitle("prev");
    $("#offcanvas").animate({
        left: "-170px"
    }, time, function() {});
}

/********************** WISHLIST PART **********************/
/***********************************************************/

function addSong() {
    if (!isInWishlist(currentTitle)) {
        // IF NOT in wishlist then we will add that
        if (localStorage.getItem("trccplayer-wishlist") == null) {
           Song = "$@%" + currentTitle + "\n";
        } else {
           Song = localStorage.getItem("trccplayer-wishlist") + "$@%" + currentTitle + "\n";
        }
        localStorage.setItem("trccplayer-wishlist", Song);
        Songs[Songs.length] = currentTitle;
    } // ELSE nothing to do
}

function removeSong(songToRemove) {
    if (isInWishlist(songToRemove)) {
        /* Vor Replace §$§ hhinzufügen, weil er sonst nicht entferenen kann,
           und dannach wenn vorhanden, also for split wieder entferenen 
           Auch, wenn ich nicht weiß, warum das nicht so sein sollte        */
        var SongString  = "§$§" + Songs.join("§$§");
        var searchthing = "§$§" + songToRemove;
        SongString = SongString.replace(searchthing, "");
        if (SongString.startsWith("§$§")) {
            SongString = SongString.substr(3);
        }
        Songs = SongString.split("§$§");
        Save();
        if (songToRemove == currentTitle) {
            $("#add").removeClass("added");
        }
    } // Nothing to remove
}

function initWishlist() {
    // Init the Array with the Songs stored in the localStorage
    if (localStorage.getItem("trccplayer-wishlist") != null) {
        var wishlistItems = localStorage.getItem("trccplayer-wishlist");

        var wishlistItemsLength = (wishlistItems.split("$@%").length - 1);
        console.log(wishlistItemsLength + " Songs are on the wishlist");
        var splitted = wishlistItems.split("$@%");
        for (var i = 1; i <= wishlistItemsLength; i++) {
            var c = (i - 1);
            Songs[c] = splitted[i].substr(0, splitted[i].length - 1);
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
    // Here only save the thing, if there is something to save, only to be sure
    if (Songs.length > 0) {
        var songtmp = "$@%" + Songs.join("\n$@%") + "\n";
        localStorage.setItem("trccplayer-wishlist", songtmp);
    }
}

function render() {
    var wishlistHTML = "<ul>\n<li>" + Songs.join("</li>\n<li>") + "</li>\n</ul>";
    if (wishlistHTML == "<ul>\n<li></li>\n</ul>") {
        // Exeption for worst case scenario
        localStorage.removeItem("trccplayer-wishlist");
        Songs = new Array();
        $("#wishlist").html("");
    } else {
        $("#wishlist").html(wishlistHTML);
    }
    $("#wishlist ul li").click(function() {
        removeSong($(this).html());
        render();
    });
}