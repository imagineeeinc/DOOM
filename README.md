# DOOM
DOOM is a powerfully small application for command-line interface and emulating terminals. It is made with web standards. It is focused at being primarily around speed, stability, customiziblity, beautiful design and extra features.

# Usage/ Instalation
To use on your system, download the latest build from [here](https://github.com/imagineeeinc/DOOM/releases/latest)

Or, [build from source](#Build)

# Features Planned
There are features that are still being implemented
Few are:
- User settings
- Themes
- Multiple Shells
- customizing settings
- split terminal
- extension (probably not)

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
