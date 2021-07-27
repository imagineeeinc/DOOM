const { dialog } = require('electron').remote
const { BrowserWindow } = require("electron");
const { app } = require("electron");
const { remote } = require('electron')
const { shell } = require('electron')
const { clipboard } = require('electron')
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
//store.delete("theming")
if (store.get('theming') == undefined) {
    store.set("theming", {
        css: `
            :root {
                --foreground: #ffffff;
                --background: #000;
                --cursor: #ffffff;
                --selection: rgba(184, 172, 231, 0.6);
                --black: #000000;
                --red: #e06c75;
                --brightRed: #e06c75;
                --green: #A4EFA1;
                --brightGreen: #A4EFA1;
                --brightYellow: #EDDC96;
                --yellow: #EDDC96;
                --magenta: #e39ef7;
                --brightMagenta: #e39ef7;
                --cyan: #5fcbd8;
                --brightBlue: #5fcbd8;
                --brightCyan: #5fcbd8;
                --blue: #5fcbd8;
                --white: #d0d0d0;
                --brightBlack: #808080;
                --brightWhite: #ffffff;
            }
        `
    })
}
document.getElementById("theme").textContent = store.get('theming').css
setInterval(function() {
    document.getElementById("theme").textContent = store.get('theming').css
}, 500)