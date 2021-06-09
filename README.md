# DOOM
A powerfully small terminal emulator, THE TERMINAL OF DOOM

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
