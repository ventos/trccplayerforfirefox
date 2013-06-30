data = require("self").data
var { Hotkey } = require("sdk/hotkeys");

var PlayerPanel = require("panel").Panel({
    width:415,
    height:230,
    contentURL: data.url("player.html")
});

require("widget").Widget({
    id: "Player",
    label: "TheRadio.CC-Player for Firefox",
    contentURL: data.url("icon_favicon.ico"),
    panel: PlayerPanel
});
 
var showHotKey = Hotkey({
  combo: "accel-shift-y",
  onPress: function() {
    PlayerPanel.show();
  }
});
var hideHotKey = Hotkey({
  combo: "accel-alt-y",
  onPress: function() {
    PlayerPanel.hide();
  }
});