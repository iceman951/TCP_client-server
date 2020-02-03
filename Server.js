var net = require("net")
var HOST = '127.0.0.1'
var PORT = 6969

var server = net.createServer()     //สร้าง http server ขึ้นมา โดยเปิด port 6969
server.listen(PORT, HOST)

var clients = {     //สร้าง obj clients มี keys ABC, DEF, XYZ และ value 0, 7, 3 ตามลำดับ
    "ABC": 0,
    "DEF": 7,
    "XYZ": 3
}

var data_in = Object.keys(clients); //ดึงค่าของ property มาเก็บไว้ใน data_in

var clientName;

server.on('connection', function (socket) {     //เรียกใช้ function(socket) เมื่อเกิด event connection
    console.log('CONNECTED' + socket.remoteAddress + ':' + socket.remotePort) //
    socket.write('Who are u? : ')   //
    var firstText = true;   //กำหนดตัวแปรเพื่อนำไปใช้ตรวจสอบข้อความแรก
    socket.on('data', function (data) {     //เรียกใช้ function เมื่อมีข้อมูลเข้ามา
        console.log('CONNECTED: ' + socket.remoteAddress + ':' + socket.remotePort)
        var input = data.toString()     //เปลี่ยนค่าที่รับเข้ามาเป็น String

        if (firstText) {
            clientName = data_in.filter(data => data == input).toString()   //ตรวจสอบค่าที่รับมาว่าเป็นใคร
            socket.write(`Your Score is ${clients[input]} \nEnter command(Exit Type "BYE":)`); //ส่งค่า score ให้ client
            firstText = false;  //กำหนดค่าเป็น false เพื่อจะได้ไม่ต้องตรวจสอบซ้ำว่าเป็นข้อความแรกหรือไม่

        } else if (!isNaN(parseInt(input))) {   //ตรวจสอบว่าค่าที่รับมาเป็นตัวเลขหรือไม่
            clients[clientName] = clients[clientName] + parseInt(input);    //เพิ่มค่า value ของ key ตามค่าที่ได้รับมา
            socket.write(`Your score is ${clients[clientName]}\nEnter command:`);   //ส่งค่าคะแนนที่คำนวนแล้วไปให้ client
        } else if (input == 'BYE')  //เมื่อ Client ส่งข้อความ BYE จะส่งข้อความ close ไปให้ client
            socket.write('close')   
        else socket.write('close')

    })


})