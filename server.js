const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gym_management'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});

// User Signup Endpoint
app.post('/signup', (req, res) => {
    const { name, email, password, weight, height, age } = req.body;
    const sql = 'INSERT INTO users (name, email, password, weight, height, age) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, email, password, weight, height, age], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('User registered successfully');
    });
});

// User Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
