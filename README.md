# DOOM
<p align="center">
  <img src="build/icon.png" width="30%">
</p>
DOOM is a powerfully small application for command-line interface and emulating terminals. It is made with web standards. It is focused at being primarily around speed, stability, customiziblity, beautiful design and extra features.

# Usage/ Instalation
To use on your system, download the latest build from [here](https://github.com/imagineeeinc/DOOM/releases/latest)

Or, [build from source](#Build)

# Documentation
[Read the documention here](https://github.com/imagineeeinc/DOOM/tree/main/docs)

# Features Planned
There are features that are still being implemented
Few are:
- User settings
- Themes
- Multiple Shells
- customizing settings
- split terminal
- extension (probably not)
- Remote connections
  - ssh
  - vnc (probably not)
  - DOOM Remote conection (a npm module will be made and will use web sockets or webRTC to communicate with the host to the DOOM Appliction, you have to install the module on the host computer, start the server, and then connect to it with the client)
  - DOOM remote connection[host] (a feature that allows you to become the host)
  - Phone Book (list of remote connections)

# Build
### software
- git
- node (with npm)
- [windows build tools (for windows only)](https://github.com/felixrieseberg/windows-build-tools)
- [node-gyp (for rebulding dependencies)](https://github.com/nodejs/node-gyp)
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
