const os = require("os")

let startShells = os.platform() === "win32" ? `[
	{
			"name": "cmd",
			"location": "C:\\\\Windows\\\\System32\\\\cmd.exe",
			"icon": "$cmd.png"
	},
	{
			"name": "powershell",
			"location": "C:\\\\Windows\\\\System32\\\\WindowsPowershell\\\\v1.0\\\\powershell.exe",
			"icon": "$powershell.png"
	}
]` : `[
	{
			"name": "bash",
			"location": "bash",
			"icon": "$bash.png"
	},
	//for mac users
	{
			"name": os.type() === "Darwin" ? "terminal.app" : "bash",
			"location": os.type() === "Darwin" ? "Terminal.app" : "bash",
			"icon": "$bterminal.app.png"
	}
]`

let shells = `{
	"os": "${os.type()}",
	"platform": "${os.platform()}",
	"startAtHomedir": false,
	"shells": ${startShells},
	"defaultShell": "$first_list"
}`

let theme = `{
	"forceOffDefault": false,
	"css": ":root {--foreground: #ffffff;--background: #000;--cursor: #ffffff;--selection: rgba(184, 172, 231, 0.6);--black: #000000;--red: #e06c75;--brightRed: #e06c75;--green: #A4EFA1;--brightGreen: #A4EFA1;--brightYellow: #EDDC96;--yellow: #EDDC96;--magenta: #e39ef7;--brightMagenta: #e39ef7;--cyan: #5fcbd8;--brightBlue: #5fcbd8;--brightCyan: #5fcbd8;--blue: #5fcbd8;--white: #d0d0d0;--brightBlack: #808080;--brightWhite: #ffffff;--fontFamily: plex;}"
}
`
module.exports.basic = `
{
	"user": "anonymous DOOM Term User",
	"shells": ${shells},
	"theme": ${theme}
}
`