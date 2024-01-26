const express = require('express');
const path = require('path');
const cors = require('cors');
require('../db/mongoose');

const app = express();

app.use(express.static('public'));

const productRouter = require('../routers/product');
app.use(cors());
app.use(express.json());
app.use(productRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = app;
