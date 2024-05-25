const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/vdt2024')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/students', studentRoutes);

module.exports = app;
