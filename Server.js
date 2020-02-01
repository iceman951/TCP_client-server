var net = require("net")
var HOST = '127.0.0.1'
var PORT = 6969

var server = net.createServer()
server.listen(PORT,HOST)

var clients = {
    "ABC": 0,
    "DEF": 7,
    "XYZ": 3
}
var data_in = Object.keys(clients);
var name;

server.on('connection', function(socket) {
    console.log('CONNECTED' + socket.remoteAddress + ':' + socket.remotePort)
    socket.write('Who are u? : ')
    var first = true;
    socket.on('data', function(data) {
        console.log('CONNECTED: ' + socket.remoteAddress +':'+ socket.remotePort)
        var input = data.toString()
        
        if (first) {
            name = data_in.filter(dt => dt == input).toString()
            socket.write(`Your Score is ${clients[name]} \n`);
            first = false;
 
        }

        else if(!isNaN(parseInt(input))){
            clients[name] = clients[name] +  parseInt(input); 
            socket.write(`Your score is ${clients[name]}\nEnter command: `);
            } 
        else if (input == 'BYE') {
            socket.write('closeNaJa')
            server.close();
        }
        

    })

    socket.on('disconnect', function() {
        console.log('CLOSED' + socket.remoteAddress +':'+ socket.remotePort)
        server.close();
    })

})