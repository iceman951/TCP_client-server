var net = require("net")
var HOST = '127.0.0.1'
var PORT = 6969
//เป็น module สำหรับการอ่านค่า stream แบบ line-by-line
const readline = require('readline').createInterface({
  input: process.stdin, // the readable stream to listen to
  output: process.stdout // the writable stream to write readline data to
})
//สร้าง client เพื่อใช้เชื่อมต่อกับ Server
var client = new net.Socket()
// เชื่อมต่อ Client กับ Server โดยมี Port และ Host ที่ตรงกันกับ Server
client.connect(PORT, HOST, function() {
  console.log('CONNECTED' + HOST + PORT)
})
//เป็น Listener จะถูกเรียกใช้ทุกครั้งเมื่อมีการส่งค่ามา
client.on('data', function(data) {
  if (data.toString() == 'close') {
    console.log('Connection Closed')
    client.destroy(); // kill Client หลังจากปิด Connection
    readline.close(); // ปิดการทำงานของ module readline

  } else
  //แสดง output ที่ Client ส่งไป
    readline.question(data, function(data) {
      client.write(data);
    })
})

client.on('error', function() {
  console.log('error');
  readline.close();

});
