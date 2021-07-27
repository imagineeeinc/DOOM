# DOOM Documentation
## Contents
- [Instalation](#Instalation)
- [Build](#Build)
- [First Time](#First Time)

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
