const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  res.send('Welcome to the Node.js with Express and MySQL API');
});

router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

router.post('/formContact', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO contactos set ?', [req.body], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ message: 'Mensaje registrado' });
    }
  });
});


router.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`User added with ID: ${results.insertId}`);
    }
  });
});


module.exports = router;