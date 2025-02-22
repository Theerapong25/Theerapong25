const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = 8000;

app.use(bodyParser.json());

let users = [];
let conn = null;

// ฟังก์ชันเชื่อมต่อ MySQL
const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8830
    });
};

// GET /users - ดึง Users ทั้งหมด
app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0]);
});

// POST /users - เพิ่ม Users ใหม่
app.post('/users', async (req, res) => {
    let user = req.body;
    const results = await conn.query('INSERT INTO users SET ?', user);

    res.json({
        message: 'Create user successfully',
        data: results[0]
    });
});

// GET /users/:id - ดึง Users ตาม ID
app.get('/users/:id', async (req, res) => {
    let id = req.params.id;
    const results = await conn.query('SELECT * FROM users WHERE id = ?', [id]);

    res.json(results[0].length > 0 ? results[0][0] : { message: 'User not found' });
});

// PUT /users/:id - อัปเดตข้อมูล Users ตาม ID
app.put('/users/:id', async (req, res) => {
    let id = req.params.id;
    let updateUser = req.body;

    await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser, id]);

    res.json({
        message: 'Update user successfully',
        data: updateUser
    });
});

// DELETE /users/:id - ลบ Users ตาม ID
app.delete('/users/:id', async (req, res) => {
    let id = req.params.id;
    await conn.query('DELETE FROM users WHERE id = ?', [id]);

    res.json({
        message: 'Delete user successfully',
        userId: id
    });
});

// เริ่มเซิร์ฟเวอร์และเชื่อมต่อฐานข้อมูล
app.listen(port, async () => {
    await initMySQL();
    console.log('Http Server is running on port ' + port);
});


