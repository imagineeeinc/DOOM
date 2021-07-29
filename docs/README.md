# DOOM Documentation
## Contents
- [About](#About)
- [Instalation](#Instalation)
- [Build](#Build)
- [First Time](#First-Time)
- [Key Bindings](#Key-Bindings)

# About
<p align="center">
  <img src="icon.png" width="30%">
</p>
DOOM is a powerfully small application for command-line interface and emulating terminals. It is made with web standards. It is focused at being primarily around speed, stability, customiziblity, beautiful design and extra features.


# Instalation
__NOTE: currently only windows executables are avalible, if you want for your platform, please bulid from source by following the [build guide](#Build)__
To start using DOOM on your device:
1. [Go to the Github Release page](https://github.com/imagineeeinc/DOOM/releases/latest)
2. Download your desired Executable for your system.
3. - If you downloaded the zip, unzip it and run the executable
   - If you downloaded the executabe, the just run it
And Thats is

If you want to Build from source or make from your own code [Go to the Build Section](#Build)

# Build
to build you will need git for cloning the repo (optional)

make sure to have node (with npm)

Install [windows build tools (for windows only)](https://github.com/felixrieseberg/windows-build-tools)
and [node-gyp (for rebulding native dependencies)](https://github.com/nodejs/node-gyp)
Run these Commands:
```bash
git clone https://github.com/imagineeeinc/DOOM.git
# clone repository
npm i
# install dependencies
npm run rebuild
# rebuild node-pty
npm start
# for testing
npm run dist
# build executable
```
# First Time
The First Time You open DOOM you will be greated with a dark window and the default shell of your OS.

You will see a tab at the top of the screen. This is the Tab list there will be more tabs the more terminals instances you open.

To the right of the screen at the very top are the window controls like close, maximize, minimize; on the left of the screen is your Global menu with options for you to use.

On right of the Tab List there is two buttons, one is a plus icon, this is the new instace button and will open a new instance of the default shell; the one next to it is a drop down arrow which is the more shells menu with more shells if you your system has any (on windows powershell, and wsl if installed, but you need to set that up, for now you can type wsl in the cmd to get wsl).

The big black box Bellow the Tab list is the terminal it self. And thats it.

# Key Bindings
- Copy: `Ctrl+C` (make sure to select the text needed to copy or it will go to the currently selected shell)
- Paste: `Ctrl+Shift+V`
- Reload Window: `Ctrl+Shift+R`
- Ouick New Terminal instance: `Ctrl+Shift+N`
- Switch to Terminal instance on the left: `Ctrl+⬅`
- Switch to Terminal instance on the right: `Ctrl+➡`
- Minimize: `Ctrl+Shift+⬇`
- Maximize: `Ctrl+Shift+⬆`
- Emoji Picker: `Ctrl+Shift+;`
