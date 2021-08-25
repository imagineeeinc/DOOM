var mousePos = {x:0,y:0}
var curEle = null
document.body.onkeydown = function(event) {
    //console.log(event.keyCode)
    //<: 37, >: 39, /\: 38, \/: 40
    if (process.env.DEV != "true") {
        if (event.keyCode === 73 && event.shiftKey === true && event.ctrlKey === true) {
            event.preventDefault()
        }
    }
    if (event.keyCode === 82 && event.ctrlKey === true) {
        event.preventDefault()
    }
    if (event.keyCode === 78 && event.shiftKey === true && event.ctrlKey === true) {
        newTerm(defaultShellName + Math.round(Math.floor(Math.random() * 1000) + 9999))
    }
    if (event.keyCode === 67 && event.shiftKey === true && event.ctrlKey === true) {
        closeTerm(curTerm)
    }
    if (event.keyCode === 37 && event.ctrlKey === true) {
        selectTerm("left")
    }
    if (event.keyCode === 39 && event.ctrlKey === true) {
        selectTerm("right")
    }
    if (event.keyCode === 38 && event.shiftKey === true && event.ctrlKey === true) {
        maximize()
    }
    if (event.keyCode === 40 && event.shiftKey === true && event.ctrlKey === true) {
        minimize()
    }
    if (event.keyCode === 82 && event.shiftKey === true && event.ctrlKey === true) {
        ipc.send('reload')
    }
    if (event.keyCode === 186 && event.ctrlKey === true) {
        emojiPick()
    }
}
document.onclick = function(event) {
    if (curEle != document.querySelector('emoji-picker')) {
        document.querySelector('emoji-picker').style.display = "none";
    }
    if (curEle != document.getElementById('add-more-menu') && curEle != document.getElementById('add-more-tab')) {
        document.getElementById('add-more-menu').style.display = "none";
    }
    //TODO: more terms, fonts
}
document.onmousemove = (e) => {mousePos = {x:e.screenX,y:e.screenY};curEle = e.target}
function emojiPick() {
    document.querySelector('emoji-picker').style.left = mousePos.x+"px"
    document.querySelector('emoji-picker').style.top = mousePos.y+"px"
    document.querySelector('emoji-picker').style.display = "block"
}

function closeapp() {
    win.close()
}
document.getElementById("close").onmouseup = function() {
    closeapp()
}
document.getElementById("maximize").onmouseup = function() {
    maximize()
}
function maximize() {
    if (win.isMaximized()) {
        win.unmaximize()
    } else {
        win.maximize()
    }
}
function minimize() {
    win.minimize()
}
document.getElementById("minimize").onmouseup = function() {
    minimize()
}
const template = [
{
    label: 'File',
    submenu: [
        {
            label: 'New Tab',
            click() {
                newTerm(defaultShellName + Math.round(Math.floor(Math.random() * 1000) + 9999))
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Close',
            click() {
                closeapp()
            }
        }
    ]
},
{
    label: 'Edit',
    submenu: [
        {
            role: 'copy'
        },
        {
            role: 'paste'
        },
        {
            role: 'selectAll'
        },
        {
            type: 'separator'
        },
        {
            label: 'Preferences',
            click() {
                
            }
        }
    ]
},

{
    label: 'View',
    submenu: [
        {
            role: 'reload'
        },
        {
            role: 'toggledevtools'
        },
        {
            type: 'separator'
        },
        {
            role: 'resetzoom'
        },
        {
            role: 'zoomin'
        },
        {
            role: 'zoomout'
        },
        {
            type: 'separator'
        },
        {
            role: 'togglefullscreen'
        }
    ]
},

{
    role: 'window',
    submenu: [
        {
            role: 'minimize'
        },
        {
            label: 'Maximize',
            click() {
                if (win.isMaximized()) {
                    win.unmaximize()
                } else {
                    win.maximize()
                } 
            }
        },
        {
            role: 'close'
        },
        {
            type: 'separator'
        },
        {
            role: 'togglefullscreen'
        }
    ]
},

{
    role: 'help',
    submenu: [
        {
            role: 'about'
        }
    ]
}
]

const menu = Menu.buildFromTemplate(template)

/*
menu.append(new MenuItem ({
    label: 'MenuItem1',
    click() { 
        console.log('item 1 clicked')
    }
}))
*/
document.getElementById("menu").onclick = (e) => {
    e.preventDefault()
    menu.popup(remote.getCurrentWindow())
}

document.getElementById("add-more-tab").onclick = (e) => {
    e.preventDefault()
    document.getElementById('add-more-menu').style.display = 'block'
}

setInterval(function(){
    document.getElementById("terminal-holder").style.height = window.innerHeight - 60 + "px"
    document.getElementById("tabs").style.gridTemplateColumns = "repeat(" + document.querySelectorAll("#tabs>span").length + ", 1fr)"
}, 50)