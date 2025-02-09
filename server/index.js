const http = require('http'); //importing http module

const host = 'localhost'; //localhost
const port = 8000; //port number

//เมื่อเปิด เว็บไปที่ http://localhost:8000/ ขะเรียกใช้งาน function requestListener
const requestListener = function (req, res) {
    res.writeHead(200); //status code
    res.end('My first server!'); //response
}

const server = http.createServer(requestListener); //create server
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`); // สามารถเอา string มาต่อกันได้ด้วยเครื่องหมาย `` และใช้ ${} ในการเรียกใช้ตัวแปร
});

//cd change directory
//ls list
//pwd print working directory
// cd.. กลับไปที่ directory ก่อนหน้า go back 
// exit ออกจาก terminal
//docker stop <container id> หยุด container
//docker system prune -a ลบ container ทั้งหมด
//docker -compose up รัน container
//docker-compose down หยุด container