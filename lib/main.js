var panels = require("sdk/panel");
var self = require("sdk/self");
var ui = require("sdk/ui");
var { Hotkey } = require("sdk/hotkeys");

var button = ui.ActionButton({
  id: "trcc-button",
  label: "TheRadio.CC - Player",
  icon: self.data.url("icon_favicon.ico"),
  onClick: showPanel
});

var panel = panels.Panel({
  width: 415,
  height: 230,
  contentURL: self.data.url("player.html")
});

function showPanel(state) {
  panel.show({
    position: button
  });
}

var showHotKey = Hotkey({
  combo: "accel-shift-x",
  onPress: function() {
    panel.show();
  }
});
var hideHotKey = Hotkey({
  combo: "accel-alt-x",
  onPress: function() {
    panel.hide();
  }
});
