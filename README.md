# TheRadio.CC-Player for Firefox 0.3#

Listen to http://theradio.cc in your Firefox Webbrowser.
No restart!


**Works only with Firefox >29**


### Shortcuts ###
`Ctrl+Shift+X` to show the player panel
`Ctrl+Alt+X` to hide the player panel

##### In Addon #####
`y` to play and `x` to pause

## Install ##

To install this addon: open 'theradiocc-player.xpi' with Firefox

### Building ###

In the following is shown how to build the addon yourself using the Addon SDK 1.16

    wget https://ftp.mozilla.org/pub/mozilla.org/labs/jetpack/addon-sdk-1.16.zip
    unzip addon-sdk-1.16.zip
    cd addon-sdk-1.16
    source bin/activate
    cd ..
    git clone https://github.com/ventos/trccplayerforfirefox.git
    cd trccplayerforfirefox
    cfx xpi

You'll get `theradiocc-player.xpi` -> Now you're able to install it.
