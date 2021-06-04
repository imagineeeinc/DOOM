if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

document.body.onkeydown = function(event) {
    if (process.env.DEV != "true") {
        if (event.keyCode === 73 && event.shiftKey === true && event.ctrlKey === true) {
            event.preventDefault()
        }
    }
    if (event.keyCode === 67 && event.shiftKey === true && event.ctrlKey === true) {

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