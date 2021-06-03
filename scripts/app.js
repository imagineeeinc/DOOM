document.body.onkeydown = function(event) {
    //if (event.keyCode === 73 && event.shiftKey === true && event.ctrlKey === true) {
    //    event.preventDefault()
    //}
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