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
const eleStore = require('electron-store')

const fs = require('fs')
const path = require('path')
const os = require('os')

var store = new eleStore()

let startShells = os.platform() === 'win32' ? [
    {
        name: "cmd",
        location: "C:\\Windows\\System32\\cmd.exe",
        icon: "$cmd.png"
    },
    {
        name: "powershell",
        location: "C:\\Windows\\System32\\WindowsPowershell\\v1.0\\powershell.exe",
        icon: "$powershell.png"
    }
] : [
    {
        name: 'bash',
        location: "bash",
        icon: "$bash.png"
    },
    //for mac users
    {
        name: os.type() === 'Darwin' ? 'terminal.app' : 'bash',
        location: os.type() === 'Darwin' ? 'Terminal.app' : 'bash',
        icon: "$bterminal.app.png"
    }
]

//store.delete("shells")
if (store.get('shells') == undefined) {
    store.set("shells", {
        os: os.type(),
        platform: os.platform(),
        shells: startShells,
        defaultShell: "$first_list"
    })
}
console.log(store.get('shells'))