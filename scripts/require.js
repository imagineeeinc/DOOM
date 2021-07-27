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
const osu = require('node-os-utils')
/*
var systemDetails = {
    cpu: {
        count: osu.cpu.count(),
        model: osu.cpu.model()
    }
}
*/

const fs = require('fs')
const path = require('path')
const os = require('os')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
var appVersion = require("electron").remote.app.getVersion();
var store = new eleStore()
function link(link) {
    shell.openExternal(link)
}

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
        startAtHomedir: false,
        shells: startShells,
        defaultShell: "$first_list"
    })
}
//store.delete("theming")
if (store.get('themeing') == undefined) {
    store.set("themeing", {
        forceOffDefault: false,
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
if (store.get('firstTime') == undefined) {
    store.set("firstTime", true)
    firstTime()
    if (process.env.DEV == "true") {
        store.delete("firstTime")
    }
}
document.getElementById("theme").textContent = store.get('theming').css
setInterval(function() {
    document.getElementById("theme").textContent = store.get('themeing').css
    if (store.get('themeing').forceOffDefault == true) {
        document.getElementById("default-style").src = ""
    } else {
        document.getElementById("default-style").src = "../styles/style.css"
    }
}, 500)

function firstTime() {
    
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }
    document.getElementById('app-version').innerText = appVersion
    //document.getElementById('system-details').innerText = JSON.stringify(systemDetails)
    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
    document.getElementById("first-time").style.display="block"
    document.querySelector("#first-time > .close").onmouseup = () => {
        document.getElementById("first-time").style.display="none"
    }
}