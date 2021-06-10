var term = {}
let shells = store.get("shells")
var defaultShell
var defaultShellName
if (shells.defaultShell === "$first_list") {
    defaultShell = shells.shells[0].location
    defaultShellName = shells.shells[0].name
} else {
    defaultShell = shells.shells[shells.defaultShell].location
}
const fitAddon = new FitAddon()
var last_size = {x:0,y:0}
var curTerm

var stls = getComputedStyle(document.documentElement)
//.getPropertyValue('--my-variable-name')

var closeBtn = document.createElement("button")
closeBtn.innerHTML = "<img src='../file/icons/close.svg'>"

function newTerm(name, shell) {
    term[name] = new Terminal({
        cursorBlink: "bar",
        allowTransparency: true,
        theme: {
            foreground: '#ffffff',
            background: '#000',
            cursor: '#ffffff',
            selection: 'rgba(255, 255, 255, 0.3)',
            black: '#000000',
            red: '#e06c75',
            brightRed: '#e06c75',
            green: '#A4EFA1',
            brightGreen: '#A4EFA1',
            brightYellow: '#EDDC96',
            yellow: '#EDDC96',
            magenta: '#e39ef7',
            brightMagenta: '#e39ef7',
            cyan: '#5fcbd8',
            brightBlue: '#5fcbd8',
            brightCyan: '#5fcbd8',
            blue: '#5fcbd8',
            white: '#d0d0d0',
            brightBlack: '#808080',
            brightWhite: '#ffffff'
        }
    })
    /*
    Template:

    foreground: '#ffffff',
        background: '#000',
        cursor: '#ffffff',
        selection: 'rgba(255, 255, 255, 0.3)',
        black: '#000000',
        red: '#e06c75',
        brightRed: '#e06c75',
        green: '#A4EFA1',
        brightGreen: '#A4EFA1',
        brightYellow: '#EDDC96',
        yellow: '#EDDC96',
        magenta: '#e39ef7',
        brightMagenta: '#e39ef7',
        cyan: '#5fcbd8',
        brightBlue: '#5fcbd8',
        brightCyan: '#5fcbd8',
        blue: '#5fcbd8',
        white: '#d0d0d0',
        brightBlack: '#808080',
        brightWhite: '#ffffff'
        */
    term[name].name = name

    let doc = document.createElement("div")
    doc.id = name

    document.getElementById("terminal-holder").append(doc)

    term[name].open(document.getElementById(name))
    term[name].fitA = new FitAddon()
    term[name].loadAddon(term[name].fitA)
    term[name].fitA.fit()

    let tab = document.createElement("span")
    let clo = closeBtn.cloneNode(true)
    tab.id = "tab-" + name
    tab.innerHTML = "<span>" + shell || name + "</span>"
    tab.append(clo)
    tab.setAttribute("title", name)
    tab.setAttribute("onclick", "openTerm('" + name +"')")
    clo.setAttribute("onclick", "closeTerm('" + name +"')")
    document.getElementById("tabs").append(tab)

    ipc.send('newTerm', {name: name, shell: shell, cols: term[name].cols, rows: term[name].rows})

    term[name].onData((data, ev) => {
        ipc.send('run', {data: data, name: name})
    })
    document.getElementById(name).scrollIntoView()
    curTerm = name
}

ipc.send('canIstart')

ipc.on('allowedToBegin', (event, arg) => {
    console.log("Can Proceed To Begin")
    newTerm("main-shell", defaultShell)
    for(var i=0;i < term.length;i++) {
        ipc.send('resize', {cols: term[i].cols, rows: term[i].rows, name: term[i].name})
    }
})
function openTerm(name) {
    try {
        document.getElementById(name).scrollIntoView()
        curTerm = name
    }
    catch(e) {}
}
function closeTerm(name) {
    ipc.send('kill', {name: name})
    document.getElementById("tab-" + name).remove()
    document.getElementById(name).remove()
    curTerm = Object.keys(term).indexOf(name) - 1 == -1 ? Object.keys(term)[Object.keys(term).length - 1] : Object.keys(term)[Object.keys(term).indexOf(name) - 1]
    delete term[name]
}

ipc.on('printTerm', (event, arg) => {
    document.getElementById("tab-" + arg.name).querySelector("span").innerHTML = arg.file
    term[arg.name].write(arg.data)
})
/*TODO: set selected
setInterval(function() {
    document.getElementById("tab-" + curTerm).setAttribute("selected", "true")
}, 50)
*/

setInterval(function() {
        for(var i=0;i < Object.keys(term).length;i++) {
            term[Object.keys(term)[i]].fitA.fit()
            ipc.send('resize', {cols: term[Object.keys(term)[i]].cols, rows: term[Object.keys(term)[i]].rows, name: Object.keys(term)[i]})
        }

}, 5000)
setInterval(function() {
    let tabs = document.querySelectorAll("#tabs>span")
        for(var i=0;i < tabs.length;i++) {
            tabs[i].classList.remove("selected")
            if (tabs[i].id.indexOf("tab-" + curTerm) > -1) tabs[i].className += " selected"
        }
}, 50)