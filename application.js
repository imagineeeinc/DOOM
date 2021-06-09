//const { app, BrowserWindow } = require('electron')
//TODO: clean up code
const { app, Tray, Menu, dialog, globalShortcut } = require('electron')
const { BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
const path = require("path")

const eleStore = require('electron-store')  

const termHandler = require("./scripts/terminal-handeler")
const ver = "1.0.3"

var term = {}

var mainWindow
var autoLaunch
let firstClose = false

function createWindow () {
  const win = new BrowserWindow({
    frame: false,
    fullscreenable: true,
    hasShadow: true,
    width: 1100,
    height: 900,
    minimizable: true,
    minWidth: 670,
    minHeight: 460,
    //defaultFontFamily: "monospace",
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      spellcheck: true
    }
  })
  let tray = null
  win.on('minimize', function (event) {
    if (firstClose === false) {
      event.preventDefault();
      tray = createTray();
    } else if (firstClose === true) {
      firstClose = false
    }
  });

  win.on('restore', function (event) {
    if (firstClose === false) {
      win.show();
      tray.destroy();
    } else if (firstClose === true) {
      firstClose = false
    }
  })
  win.loadFile('views/index.html')

  return win
  //win.webContents.openDevTools()
}
function createTray() {
  appIcon = new Tray(/*path.join(__dirname, "cloud_fun.ico")*/"file/example.ico");
  const contextMenu = Menu.buildFromTemplate([
      {
          label: 'Open', click: function () {
              mainWindow.show();
          }
      },
      {
          label: 'Shut Down App', click: function () {
              app.isQuiting = true;
              app.quit();
          }
      }
  ]);
  appIcon.on('double-click', function (event) {
      mainWindow.show();
  });
  appIcon.setToolTip('DOOM');
  appIcon.setContextMenu(contextMenu);
  return appIcon;
}

app.whenReady().then(() => {
  mainWindow = createWindow()
  mainWindow.maximize()
  eleStore.initRenderer()
  /*
  setTimeout(() => {
    console.log("allowed to start")
    mainWindow.webContents.send('allowedToBegin', {begin: true})
  }, 1000)*/
})
ipcMain.on('newTerm', (eve, arg) => {
  term[arg.name]= new termHandler.newTerm(function(data) {var nm = arg.name;send(data, nm)}, arg.name, {col: arg.cols, row: arg.rows}, arg.shell || undefined)
})
ipcMain.on('run', (event, arg) => {
  term[arg.name].write(`${arg.data}`)
})
ipcMain.on('kill', (event, arg) => {
  term[arg.name].kill()
})
ipcMain.on('resize', (event, arg) => {
  term[arg.name].resize(arg.cols, arg.rows)
})
ipcMain.on('canIstart', (eve, arg) => {
  mainWindow.webContents.send('allowedToBegin', {begin: true})
})
ipcMain.on('reload', (event, arg) => {
  mainWindow.reload()
  /*
  setTimeout(() => {
    console.log("allowed to start")
    mainWindow.webContents.send('allowedToBegin', {begin: true})
  }, 1000)*/
})
function send(data, nm) {
  mainWindow.webContents.send('printTerm', {data: data, name: nm, file: term[nm].pty._file})
}
/*
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
*/
app.setAboutPanelOptions({
  applicationName: "DOOM", 
  applicationVersion: ver,
  version: ver,
  credits: "Imagineee",
  authors: "Imagineee",
  copyright: "© 2021 Imagineee"
  //iconPath
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('will-quit', () => {
  globalShortcut.unregisterAll()
  autoLaunch.disable()
})


app.on("open-file", function(event, path) {
  event.preventDefault();
  filepath = path;
  if (ready) {
      mainWindow.webContents.send('open-file', filepath);
      filepath = null;

      return;
  }
});
ipcMain.on("download", function() {
  const win = BrowserWindow.getFocusedWindow();
})