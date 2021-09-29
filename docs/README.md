# DOOM Documentation
### *⚠Docs Are Curently being re-wrriten for a simpler to follow format⚠*
## Table Of Contents
- [Docs](#documentation)
  - [About](#About)
  - [Instalation](#Instalation)
  - [First Time](#First-Time)
  - [Key Bindings](#Key-Bindings)
  - [Features](#Features)
    - [Emoji Picker](#Emoji-Picker)
    - [Transparent Windows](#transparent-windows)
- [Developers](#developers)
  - [Development information](#Development-Information)
    - [The Stack](#The-Stack)
    - [Extra Notices](#Extra-Notices)
  - [Build](#Build)

# About
<p align="center">
  <img src="icon.png" width="30%">
</p>
DOOM is a powerfully small application for command-line interface and emulating terminals. It is made with web standards. It is focused at being primarily around speed, stability, customiziblity, beautiful design and extra features.

# Documantation
## Instalation
__NOTE: currently only windows executables are avalible, if you want for your platform, please bulid from source by following the [build guide](#Build)__
To start using DOOM on your device:
1. [Go to the Github Release page](https://github.com/imagineeeinc/DOOM/releases/latest)
2. Download your desired Executable for your system.
3. - If you downloaded the zip, unzip it and run the executable
   - If you downloaded the executabe, the just run it
And Thats is

If you want to Build from source or make from your own code [Go to the Build Section](#Build)

## First Time
The First Time You open DOOM you will be greated with a dark window and the default shell of your OS.

You will see a tab at the top of the screen. This is the Tab list there will be more tabs the more terminals instances you open.

To the right of the screen at the very top are the window controls like close, maximize, minimize; on the left of the screen is your Global menu with options for you to use.

On right of the Tab List there is two buttons, one is a plus icon, this is the new instace button and will open a new instance of the default shell; the one next to it is a drop down arrow which is the more shells menu with more shells if you your system has any (on windows powershell, and wsl if installed, but you need to set that up, for now you can type wsl in the cmd to get wsl).

The big black box Bellow the Tab list is the terminal it self. And thats it.

## Key Bindings
Make sure to swap the Ctrl out for Cmd for Mac users
- Copy: `Ctrl+C` (make sure to select the text needed to copy or it will go to the currently selected shell)
- Paste: `Ctrl+Shift+V`
- Reload Window: `Ctrl+Shift+R`
- Ouick New Terminal instance: `Ctrl+Shift+N`
- Close this Terminal Instance: `Ctrl+Shift+C`
- Switch to Terminal instance on the left: `Ctrl+⬅`
- Switch to Terminal instance on the right: `Ctrl+➡`
- Minimize: `Ctrl+Shift+⬇`
- Maximize: `Ctrl+Shift+⬆`
- Emoji Picker: `Ctrl+Shift+;`
- More Terms Menu: `Ctrl+Shift+T`
- Planed:
  - Command Pallet: `Ctrl+Shit+P`
  - Menu: `Ctrl+Shift+M`

## Features
There are amzing features avalible in DOOM, Read on to learn more
### Emoji Picker
Built into the app is emoji support.

Just by using the keyboard shortcut of `Ctrl+Shift+;` (or `Cmd+Shift+;` for Mac users`) will open up the emoji picker, now use it to your hearts content every where and in your [git commit messages](https://gitmoji.dev/).

__Know Problems__
- your system default emoji picker won't work due to certain problems with xterm js
- some times using emojis in when typing will show as unknown charecter, but work when printed by the shell; this might be due to node-pty, cmd on windows or xter js.
- emojis taking up space of two, this is a known problem in xterm js, so we have to wait until they fix it.

### Transparent Windows
DOOM supports transparent windows under the hood, by setting the `--background` to a transparent colour and setting the blur value to either 'acrylic'/ 'blurbehind'/ 'transperent'.

__Known Problems__
- the window dosn't snap to sides on windows 10, this is due windows disabling aero snap on transparent windows (read more [here](https://github.com/AryToNeX/Glasstron/issues/172#issuecomment-907348311))

# Developers
The Developers guide for development of extensions and other information

__Work in Progress of docs and api__

## Development Information
Extra information on the develoment

### The Stack
The app is built on node js with electron js to make native apps, glasstron to make transparent windows, it uses electron builder to build to native executables. The app has been built on web technolgies and standards. It uses xterm js to emulate terminal in html, node-pty to open psuedo terminals in node js.

### Extra Notices
- the window dosn't snap to sides on windows 10, this is due windows disabling aero snap on transparent windows (read more [here](https://github.com/AryToNeX/Glasstron/issues/172#issuecomment-907348311))
- Any problems with xterm js or node-pty, do not make a issue in this project, make it in their official repo.
- This is just a side project and not meant to be a mainstrem terminal emulator.

## Build
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
npm run building:deps
# rebuild node-pty
npm start
# for testing
npm run dist
# build executable
```
