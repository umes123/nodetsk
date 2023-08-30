const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
var cors = require('cors')
const Joi = require('joi');




const app = express();
const port = 3002;
app.use(cors())

// Create a MySQL connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Umesh@7504453426',
  database: 'sql_hr',
  
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware for parsing JSON data
app.use(bodyParser.json());


app.post('/posts', (req, res) => {
  const { firstname,lastname,percentage } = req.body;
  const sql = 'INSERT INTO posts (firstname, lastname,percentage) VALUES (?, ?, ?)';
  db.query(sql, [firstname, lastname,percentage], (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Post created successfully', id: result.insertId });
  });
});


app.get('/posts', (req, res) => {
  const sql = 'SELECT * FROM posts';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
});

app.delete('/posts/:id', (req, res) => {
    const resourceId = req.params.id;
  

    const sql = `DELETE FROM mytable WHERE id = ?`; 
    db.query(sql, [resourceId], (err, result) => {
      if (err) {
        console.error('Error deleting resource:', err);
        res.status(500).json({ error: 'Error deleting resource' });
        return;
      }
  
      res.status(200).json({ message: 'Resource deleted successfully' });
    });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
