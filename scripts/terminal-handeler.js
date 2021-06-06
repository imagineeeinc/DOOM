const os = require('os')
const pty = require('node-pty')

var shell = os.platform() === 'win32' ? 'cmd.exe' : 'bash';

//ptyProcess.write('ls\r');
//ptyProcess.resize(100, 40);
//ptyProcess.write('ls\r');

class newTerm {
    constructor(callback, name, dimen, cShell) {
        var ptyProcess = pty.spawn(cShell || shell, [], {
            name: name || 'DOOM Terminal',
            cols: dimen.col,
            rows: dimen.row,
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
        this.pty.resize(col, row)
    }
    kill() {
        this.pty.kill('SIGKILL')
    }
}
module.exports.newTerm = newTerm