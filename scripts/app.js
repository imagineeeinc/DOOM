if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

document.body.onkeydown = function(event) {
    if (process.env.DEV != "true") {
        if (event.keyCode === 73 && event.shiftKey === true && event.ctrlKey === true) {
            event.preventDefault()
        }
    }
    if (event.keyCode === 82 && event.ctrlKey === true) {
        event.preventDefault()
    }
    if (event.keyCode === 82 && event.shiftKey === true && event.ctrlKey === true) {
        ipc.send('reload')
    }
}



function closeapp() {
    win.close()
}
document.getElementById("close").onmouseup = function() {
    closeapp()
}
document.getElementById("maximize").onmouseup = function() {
    if (win.isMaximized()) {
        win.unmaximize()
    } else {
        win.maximize()
    }
}
document.getElementById("minimize").onmouseup = function() {
    win.minimize()
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

setInterval(function(){
    document.getElementById("terminal-holder").style.height = window.innerHeight - 60 + "px"
    document.getElementById("tabs").style.gridTemplateColumns = "repeat(" + document.querySelectorAll("#tabs>span").length + ", 1fr)"
}, 50)