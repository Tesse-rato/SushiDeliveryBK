const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const PlatesRoutes = require('./src/dishes/routes');

const app = express();
mongoose.connect('mongodb://localhost:27017/sushi-family');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static('./public'));
app.use('/dishes', PlatesRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.clear();
  console.log('Rodando na porta ', PORT);
});