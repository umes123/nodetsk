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


app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM posts WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ message: 'Data deleted successfully' });
  });
});

app.get('/posts', (req, res) => {
  const sql = 'SELECT * FROM posts';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
