var net = require("net")
var HOST = '127.0.0.1'
var PORT = 6969
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
var client = new net.Socket()

client.connect(PORT, HOST, function () {
    console.log('CONNECTED ' + HOST +':'+ PORT)
})

client.on('data', function (data) {
    if (data.toString() == 'close') {
        console.log('Connection Closed')
        client.destroy();
        readline.close();

    } else
        readline.question(data, function (name) {
            client.write(name);
        })
})

client.on('error', function () {
    console.log('error');
    readline.close();

});