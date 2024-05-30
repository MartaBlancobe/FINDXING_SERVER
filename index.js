const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const db = require('./config/db');
const indexRouter = require('./routes/index');

app.use(cors({
  origin: 'https://findxing.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use(express.json());

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;