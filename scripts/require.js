const { dialog } = require('electron').remote
const { BrowserWindow } = require("electron");
const { app } = require("electron");
const { remote } = require('electron')
const { shell } = require('electron')
const { Menu, MenuItem } = remote
win = remote.getCurrentWindow()
const contents = win.webContents
var ipc = require('electron').ipcRenderer

const { FitAddon } = require("xterm-addon-fit")

const fs = require('fs')
const path = require('path')