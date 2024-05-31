const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('Welcome to the Node.js with Express and MySQL API');
});

router.get('/users', (req, res) => {
  const db = req.app.get('db');
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

router.post('/formContact', (req, res) => {
  const db = req.app.get('db');
  const { name, email } = req.body;
  db.query('INSERT INTO contactos set ?', [req.body], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ message: 'Mensaje registrado' });
    }
  });
});

router.post('/registerUser', (req, res) => {
  const db = req.app.get('db');
  const { name, email } = req.body;
  db.query('INSERT INTO usuarios set ?', [req.body], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ message: 'Usuario registrado' });
    }
  });
});


router.post('/login', async (req, res) => {
  const db = req.app.get('db');
  const { usuario, password } = req.body;
  try {
    const [user] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    if (user.length > 0) {
      const [pass] = await db.query('SELECT * FROM usuarios WHERE usuario = ? AND password = ?', [usuario, password]);
      if (pass.length > 0) {
        return res.json('Inicio de sesión correcto');
      } else {
        return res.status(404).json('La contraseña no es correcta');
      }
    } else {
      res.status(404).json({ message: "El usuario no existe" });
    }
  } catch (err) {
    console.error('Error login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;