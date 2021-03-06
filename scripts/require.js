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
const { WebLinksAddon } = require("xterm-addon-web-links")
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
try {
    if (fs.existsSync(path.join(os.homedir()+"/.doomrc"))) {
        console.log('.doomrc exists')
    } else {
        console.log(".doomrc dosnt exist")
        const doomrcMaker = require("../scripts/doomrc.js")
        fs.writeFileSync(path.join(os.homedir()+"/.doomrc"),doomrcMaker.basic)
        console.log('wrote .doomrc')
    }
} catch(err){
    console.log(".doomrc dosnt exist")
        const doomrcMaker = require("../scripts/doomrc.js")
        fs.writeFileSync(path.join(os.homedir()+"/.doomrc"),doomrcMaker.basic)
        console.log('wrote .doomrc')
}

console.log(fs.readFileSync(path.join(os.homedir()+"/.doomrc"), 'utf8'))

const config = JSON.parse(fs.readFileSync(path.join(os.homedir()+"/.doomrc"), 'utf8'))

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
if (store.get('firstTime') == undefined) {
    store.set("firstTime", true)
    firstTime()
    if (process.env.DEV == "true") {
        store.delete("firstTime")
    }
}
document.getElementById("theme").textContent = config.theme.css
setInterval(function() {
    document.getElementById("theme").textContent = config.theme.css
    if (config.theme.forceOffDefault == true) {
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
        document.getElementById("first-time").className="first-hide"
    }
}

moreTerms(config.shells.shells)

function moreTerms(terms) {
    terms.forEach(ele => {
        let doc = document.createElement('div')
        let img = {src: ''}
        if (ele.icon == '$cmd') {
            img.src = 'codicon-terminal-cmd'
        } else if (ele.icon == '$powershell') {
            img.src = 'codicon-terminal-powershell'
        } else if (ele.icon == '$bash') {
            img.src = 'codicon-terminal-bash'
        } else if (ele.icon == '$debian') {
            img.src = 'codicon-terminal-debian'
        } else if (ele.icon == '$linux') {
            img.src = 'codicon-terminal-linux'
        } else if (ele.icon == '$tmux') {
            img.src = 'codicon-terminal-tmux'
        } else if (ele.icon == '$ubuntu') {
            img.src = 'codicon-terminal-ubuntu'
        } else {
            img.src = 'codeicon-terminal'
        }
        doc.innerHTML = ele.name
        doc.className = img.src
        doc.setAttribute('onclick', `newTerm('${ele.name}' + Math.round(Math.floor(Math.random() * 1000) + 9999), '${ele.location}')`)
        document.getElementById('add-more-shells').append(doc)
    });
}