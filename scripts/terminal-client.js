var protocolClause = '(https?:\\/\\/)';
var domainCharacterSet = '[\\da-z\\.-]+';
var negatedDomainCharacterSet = '[^\\da-z\\.-]+';
var domainBodyClause = '(' + domainCharacterSet + ')';
var tldClause = '([a-z\\.]{2,6})';
var ipClause = '((\\d{1,3}\\.){3}\\d{1,3})';
var localHostClause = '(localhost)';
var portClause = '(:\\d{1,5})';
var hostClause = '((' + domainBodyClause + '\\.' + tldClause + ')|' + ipClause + '|' + localHostClause + ')' + portClause + '?';
var pathCharacterSet = '(\\/[\\/\\w\\.\\-%~:+]*)*([^:"\'\\s])';
var pathClause = '(' + pathCharacterSet + ')?';
var queryStringHashFragmentCharacterSet = '[0-9\\w\\[\\]\\(\\)\\/\\?\\!#@$%&\'*+,:;~\\=\\.\\-]*';
var queryStringClause = '(\\?' + queryStringHashFragmentCharacterSet + ')?';
var hashFragmentClause = '(#' + queryStringHashFragmentCharacterSet + ')?';
var negatedPathCharacterSet = '[^\\/\\w\\.\\-%]+';
var bodyClause = hostClause + pathClause + queryStringClause + hashFragmentClause;
var start = '(?:^|' + negatedDomainCharacterSet + ')(';
var end = ')($|' + negatedPathCharacterSet + ')';
var strictUrlRegex = new RegExp(start + protocolClause + bodyClause + end);

//var customUri = new RegExp('/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/')

var term = {}
let shells = config.shells
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
            foreground: stls.getPropertyValue('--foreground'),
            background: stls.getPropertyValue('--background'),
            cursor: stls.getPropertyValue('--cursor'),
            selection: stls.getPropertyValue('--selction'),
            black: stls.getPropertyValue('--black'),
            red: stls.getPropertyValue('--red'),
            brightRed: stls.getPropertyValue('--brightRed'),
            green: stls.getPropertyValue('--green'),
            brightGreen: stls.getPropertyValue('--brightGreen'),
            brightYellow: stls.getPropertyValue('--brightYellow'),
            yellow: stls.getPropertyValue('--yellow'),
            magenta: stls.getPropertyValue('--magenta'),
            brightMagenta: stls.getPropertyValue('--brightMagent'),
            cyan: stls.getPropertyValue('--cyan'),
            brightBlue: stls.getPropertyValue('--brightCyan'),
            brightCyan: stls.getPropertyValue('--brightCyan'),
            blue: stls.getPropertyValue('--'),
            white: stls.getPropertyValue('--'),
            brightBlack: stls.getPropertyValue('--brightBlack'),
            brightWhite: stls.getPropertyValue('--brightWhite')
        },
        fontFamily: stls.getPropertyValue('--fontFamily') || 'plex'
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

    term[name].registerLinkMatcher(strictUrlRegex, (e, uri)=>{link(uri)})

    let tab = document.createElement("span")
    let clo = closeBtn.cloneNode(true)
    tab.id = "tab-" + name
    tab.innerHTML = "<span>" + name.replace(/[0-9]/g, '') + "</span>"
    tab.append(clo)
    tab.setAttribute("title", name)
    tab.setAttribute("onclick", "openTerm('" + name +"')")
    clo.setAttribute("onclick", "closeTerm('" + name +"')")
    document.getElementById("tabs").append(tab)
    ipc.send('newTerm', {name: name, shell: shell, cols: term[name].cols, rows: term[name].rows})
    /*
    term[name].onData((data, ev) => {
        ipc.send('run', {data: data, name: name})
    })
    */
    if (store.get('shells').startAtHomedir != false) {
        if (store.get('shells').startCommand == undefined) {
            ipc.send('run', {data: os.platform() === 'win32' ? "cls && cd "+os.homedir()+" && cmd\r" : "clear && cd "+os.homedir()+"&& bash\r", name: name})
        } else {
            ipc.send('run', {data: store.get('shells').startCommand, name: name})
        }
    }
    term[name].onKey(({ key }) => {
        if (term[name].hasSelection() && key === "") {
            document.execCommand('copy')
        } else if (term[name].hasSelection() && key === "") {
            document.execCommand('paste')
        } else if (key == '[1;6C') {
            selectTerm("right")
        } else if (key == '[1;6D') {
            selectTerm("left")
        } else if (key == '[1;6A') {
            maximize()
        } else if (key == '[1;6B') {
            minimize()
        } else {
            ipc.send('run', {data: key, name: name})
        }
    })
    document.getElementById(name).scrollIntoView()
    document.getElementById(name).focus()
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
        document.getElementById(name).focus()
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

document.body.onkeyup = (e) => {
    if (e.keyCode == 86 && e.ctrlKey == true && e.shiftKey == true) {
        ipc.send('run', {data: clipboard.readText(), name: curTerm})
    }
}
function selectTerm(next) {
    if (next == "left") {
        openTerm(Object.keys(term)[Object.keys(term).indexOf(curTerm)-1])
    } else if (next == "right") {
        openTerm(Object.keys(term)[Object.keys(term).indexOf(curTerm)+1])
    }
}
document.querySelector('emoji-picker')
    .addEventListener('emoji-click', event => {ipc.send('run', {data: event.detail.unicode, name: curTerm})});