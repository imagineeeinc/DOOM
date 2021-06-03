const { dialog } = require('electron').remote
const { BrowserWindow } = require("electron");
const { app } = require("electron");
const { remote } = require('electron')
const { shell } = require('electron')
win = remote.getCurrentWindow()
const contents = win.webContents
var ipc = require('electron').ipcRenderer

const fs = require('fs')
const path = require('path')

var term = new Terminal();
term.open(document.getElementById('terminal'));
term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')

ipc.send('run', 'dir')

ipc.on('printTerm', (event, arg) => {
    term.write(arg)
})