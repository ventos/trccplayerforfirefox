# TheRadio.CC-Player for Firefox 0.3#

Listen to http://theradio.cc in your Firefox Webbrowser.
No restart!

![screenshot](https://raw.githubusercontent.com/ventos/trccplayerforfirefox/master/doc/screenshot.png)


**Works only with Firefox >29**


### Shortcuts ###
`Ctrl+Shift+X` to show the player panel
`Ctrl+Alt+X` to hide the player panel

##### In Addon #####
`y` to play and `x` to pause

## Install ##

To install this addon: open 'theradiocc-player.xpi' with Firefox
### Troubleshooting ###

JavaScript has to be allowed for

  * file://
  * theradio.cc
  * code.jquery.com

### Building ###

Building the addon using the JPM

	[sudo] npm install jpm -g
	git clone https://github.com/ventos/trccplayerforfirefox.git
	cd trccplayerforfirefox
	jpm xpi 

You'll get `jid0-BlOtEktFWTPtfNiQElNtI3ANfcA@jetpack.xpi` -> Now you're able to install it.
