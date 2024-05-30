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

router.put('/formContact', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO contactos set ?', [req.body], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ message: 'Mensaje registrado' });
    }
  });
});

router.put('/registerUser', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO usuarios set ?', [req.body], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ message: 'Usuario registrado' });
    }
  });
});


router.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  const user = db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
  const pass = db.query('SELECT * FROM usuarios WHERE usuario = ? AND password = ?', [usuario,password]);
    if (user.length > 0 && pass.length > 0) {
      return res.json('Inicio de sesión correcto');
    }else if(user.length > 0 && pass.length <= 0 ){
      return res.status(404).json('La contraseña no es correcta');
    }
  res.status(404).json({ message: "El usuario no existe" });
});


module.exports = router;