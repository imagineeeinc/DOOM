const os = require('os')
const pty = require('node-pty')

var shell = os.platform() === 'win32' ? 'cmd.exe' : 'bash';

//ptyProcess.write('ls\r');
//ptyProcess.resize(100, 40);
//ptyProcess.write('ls\r');

class newTerm {
    constructor(callback, cShell) {
        var ptyProcess = pty.spawn(cShell || shell, [], {
            name: 'DOOM Terminal',
            cols: 80,
            rows: 30,
            cwd: process.env.HOME,
            env: process.env
        })
        ptyProcess.on('data', callback)
        this.pty = ptyProcess
    }
    write(txt) {
        this.pty.write(`${txt}`)
    }
    resize(col, row) {
        this.pty.resize(row, col)
    }
}
module.exports.newTerm = newTerm