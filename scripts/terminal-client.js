var term = {}
const fitAddon = new FitAddon()
var last_size = {x:0,y:0}

function newTerm(name, shell) {
    term[name] = new Terminal({
        cursorBlink: "bar"
    })
    term[name].name = name
    ipc.send('newTerm', {name: name})

    term[name].open(document.getElementById('terminal'))
    term[name].loadAddon(fitAddon)
    fitAddon.fit()

    term[name].onData((data, ev) => {
        ipc.send('run', {data: data, name: name})
    })
}

newTerm("main_shell")
for(var i=0;i < term.length;i++) {
    ipc.send('resize', {cols: term[i].cols, rows: term[i].rows, name: term[i].name})
}

//term.write('Hello from \x1B[1;3;31mDOOM, The Terminal Of DOOM!\x1B[0m')

ipc.on('printTerm', (event, arg) => {
    term[arg.name].write(arg.data)
})

setInterval(function() {
    let nowSize = {x: win.webContents.getOwnerBrowserWindow().getBounds().width, y: win.webContents.getOwnerBrowserWindow().getBounds().height}
    if (last_size.x == 0 || last_size.y == 0) {
        last_size = nowSize
    } else if (last_size.x != nowSize.x || last_size.y != nowSize.y) {
        last_size = nowSize
        for(var i=0;i < Object.keys(term).length;i++) {
            fitAddon.fit()
            ipc.send('resize', {cols: term[Object.keys(term)[i]].cols, rows: term[Object.keys(term)[i]].rows, name: Object.keys(term)[i]})
        }
    }
}, 1000)