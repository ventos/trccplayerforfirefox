var currentTitle = "";
var broadcast = false;
var Song;
var Songs = new Array();
var lastttl = "TheRadio.CC - Player";
var STREAM_URL_OGG = "http://stream.theradio.cc:8000/trcc-stream.ogg";
var STREAM_URL_OPUS = "http://stream.theradio.cc:8000/trcc-stream.opus";
var STREAM_URL_LQ = "http://stream.theradio.cc:8000/trcc-stream-lq.ogg";
var STREAM_URL = "http://stream.theradio.cc:8000/trcc-stream.ogg";
initWishlist();
currentSong();
currentListeners();

function currentSong() {
    $.get('http://stream.theradio.cc:12011/', function(data) {
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
                if (np.length == 1) {
                    song = artist;
                    artist = "Unknown";
                }
                $('#curTitle').text(song);
                $('span#curArtist').text(artist);
            }
        });
	var fetchTitle = window.setTimeout(currentSong, 5000);
}

function currentListeners() {
    $.get("http://counter.theradio.cc/count.json", function(data) {
      $("#listeners").text(data["listeners"]);
    });
    var fetchListeners = window.setTimeout(currentListeners, 30000);
}

function playpause() {
    if (!$("#play").hasClass("pause")) {
        $("#play").addClass("pause");
        document.getElementById("audio").src = STREAM_URL;
        document.getElementById("audio").play();
    } else {
        $("#play").removeClass("pause");
        document.getElementById("audio").src = "";
        document.getElementById("audio").src = STREAM_URL;
        document.getElementById("audio").pause();
    }
}

function search(query) {
        switch (searchengine) {
            case "ggl":
                engineurl = "https://www.google.de/search?q=";
                break;
            case "ddg":
                engineurl = "https://duckduckgo.com/?q=";
                break;
            case "jamendo":
                engineurl = "https://www.jamendo.com/de/search?qs=q=";
                break;
            case "bandcamp":
                engineurl = "https://bandcamp.com/search?q=";
                break;
            default:
                engineturl = "https://www.google.de/search?q=";
                break;
        }
        window.open(engineurl + query, '_blank');
}

/******** VOLUME ********/

function volume(mode) {
    var currentVolume = parseInt($("#ls").text());
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
    $("#ls").text(to);
}

/*******************/

/**** SHORTCUTS ****/

$(window).keydown(function(e) {
    switch (e.keyCode) {
        case 32:
            playpause();
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
    if (localStorage.getItem("trccplayer-searchengine") == "ggl") {
        searchengine = "ggl";
        $("#ggl").addClass("setactive");
    } else {
        searchengine = "ddg";
         $("#ddg").addClass("setactive");
    }
    if (localStorage.getItem("trccplayer-stream") != null) {
      switch (localStorage.getItem("trccplayer-stream")) {
        case "ogg":
          $("#stream_set_ogg").addClass("setactive");
          STREAM_URL = STREAM_URL_OGG;
          break;
        case "opus":
          $("#stream_set_opus").addClass("setactive");
          STREAM_URL = STREAM_URL_OPUS;
          break;
        case "lq":
          $("#stream_set_lq").addClass("setactive");
          STREAM_URL = STREAM_URL_LQ;
          break;
        default:
        $("#stream_set_ogg").addClass("setactive");
        STREAM_URL = STREAM_URL_OGG;
      }
    }
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
        $("#explore").addClass("hide");
        npup();
        setTitle("TheRadio.CC - Player");
    });
    $("#menuWishlist").click(function() {
        offCanvas("#menuWishlist");
        page("#wishlist");
        render();
        fadeOut(400);
        $("#explore").addClass("hide");
        npdown();
        setTitle("Merkliste");
    });
    $("#menuAbout").click(function() {
        offCanvas("#menuAbout");
        page("#about");
        fadeOut(400);
        $("#explore").addClass("hide");
        npdown();
        setTitle("Über");
    });
    $("#menuShortcuts").click(function() {
        offCanvas("#menuShortcuts");
        page("#shortcuts");
        fadeOut(400);
        $("#explore").addClass("hide");
        npdown();
        setTitle("Tastaturkürzel");
    });
    $("#menuSettings").click(function() {
        offCanvas("#menuSettings");
        page("#settings");
        fadeOut(400);
        $("#explore").addClass("hide");
        npdown();
        setTitle("Einstellungen");
    });
    $("#play").click(function() {
        playpause();
    });
    $("#weg").click(function() {
        if ($("#weg").hasClass("up")) {
            npup();
        } else {
            npdown();
        }
    });
    $("#search").click(function() {
        search(currentTitle);
    });
    $("#hoerer").click(function() {
	      window.open("http://counter.theradio.cc", "_blanck");
    });
    $("#ddg").click(function() {
        if (!$(this).hasClass("setactive")) {
            $(this).addClass("setactive");
            $("#ggl").removeClass("setactive");
            searchengine = "ddg";
            localStorage.setItem("trccplayer-searchengine", "ddg");
        }
    });
    $("#ggl").click(function() {
        if (!$(this).hasClass("setactive")) {
            $(this).addClass("setactive");
            $("#ddg").removeClass("setactive");
            searchengine = "ggl";
            localStorage.setItem("trccplayer-searchengine", "ggl");
        }
    });
   $("#stream_set_ogg").click(function() {
     if (!$(this).hasClass("setactive")) {
         $(this).addClass("setactive");
         $("#stream_set_opus").removeClass("setactive");
         $("#stream_set_lq").removeClass("setactive");
         localStorage.setItem("trccplayer-stream", "ogg");
         STREAM_URL = STREAM_URL_OGG;
         if($("#play").hasClass("pause")) {
           playpause();
           playpause();
         }
     }
   });
   $("#stream_set_opus").click(function() {
     if (!$(this).hasClass("setactive")) {
         $(this).addClass("setactive");
         $("#stream_set_ogg").removeClass("setactive");
         $("#stream_set_lg").removeClass("setactive");
         localStorage.setItem("trccplayer-stream", "opus");
         STREAM_URL = STREAM_URL_OPUS;
         if($("#play").hasClass("pause")) {
           playpause();
           playpause();
         }
     }
   });
   $("#stream_set_lq").click(function() {
     if (!$(this).hasClass("setactive")) {
         $(this).addClass("setactive");
         $("#stream_set_ogg").removeClass("setactive");
         $("#stream_set_opus").removeClass("setactive");
         localStorage.setItem("trccplayer-stream", "lq");
         STREAM_URL = STREAM_URL_LQ;
         if($("#play").hasClass("pause")) {
           playpause();
           playpause();
         }
     }
   });
});

function npup() {
    if ($("#weg").hasClass("up")) {
        $("#weg").removeClass("up");
        $("#weg").addClass("down");
        $("#status").animate({
            height: "184px"
        }, 400, function() {
            $("#explore").removeClass("hide");
        });
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
    titletmp = $("#title").text();
    if (name == "prev") {
        $("#title").text(lastttl);
    } else {
        $("#title").text(name);
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
    $("#menuSettings").removeClass("menuactive");
    $(id).addClass("menuactive");
}

function page(id) {
    switch(id) {
        case "#landing":
            var mainID = "#landing";
            var secondID = "#wishlist";
            var thirdID = "#about";
            var fourthID = "#shortcuts";
            var fifthID = "#settings"
            break;
        case "#wishlist":
            var mainID = "#wishlist";
            var secondID = "#about";
            var thirdID = "#shortcuts";
            var fourthID = "#settings";
            var fifthID = "#landing";
            break;
        case "#about":
            var mainID = "#about";
            var secondID = "#shortcuts";
            var thirdID = "#settings";
            var fourthID = "#landing";
            var fifthID = "#wishlist";
            break;
        case "#shortcuts":
            var mainID = "#shortcuts";
            var secondID = "#settings";
            var thirdID = "#landing";
            var fourthID = "#wishlist";
            var fifthID = "#about";
            break;
        case "#settings":
            var mainID = "#settings";
            var secondID = "#landing";
            var thirdID = "#wishlist";
            var fourthID = "#about";
            var fifthID = "#shortcuts";
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
    } else if (!$(fifthID).hasClass("hide")) {
        $(mainID).removeClass("hide");
        $(fifthID).addClass("hide");
    }
}

function fadeIn(time) {
    setTitle("Menü");
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
    var wishlistHTML = "<ul>\n<li>" + Songs.join("<span></span></li>\n<li>") + "<span></span></li>\n</ul>";
    if (wishlistHTML == "<ul>\n<li><span></span></li>\n</ul>") {
        // Exeption for worst case scenario
        localStorage.removeItem("trccplayer-wishlist");
        Songs = new Array();
        $("#wishlist").text("");
    } else {
        // Wohoo! My code works!! Somehow...
        var wishlistP = document.getElementById("wishlist");
        if (wishlistP.firstChild) {
          wishlistP.removeChild(wishlistP.firstChild);
        }
        var ul = document.createElement("ul");
        var tmpwishlist = wishlistHTML.replace("<ul>\n", "").replace("\n</ul>", "");
        var len = tmpwishlist.split("\n");

        for (var i = 0; i < len.length; i++) {
          var songinfo = document.createTextNode(len[i].replace("<li>", "").replace("<span></span></li>", ""));
          var li = document.createElement("li");
          var closeSpan = document.createElement("span");
          closeSpan.className = "closebtn";
          var searchSpan = document.createElement("span");
          searchSpan.className = "searchbtn";
          searchSpan.onclick = function() {
            search($(this.parentNode).text());
            render();
          }
          closeSpan.onclick = function() {
            removeSong($(this.parentNode).text().replace("&amp;", "&"));
            render();
          }
          li.appendChild(songinfo);
          li.appendChild(closeSpan);
          li.appendChild(searchSpan);
          ul.appendChild(li);
        }

        wishlistP.appendChild(ul);
    }
}
