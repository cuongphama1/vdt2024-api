const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');
const cors = require('cors')

const app = express();
app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/students', studentRoutes);

module.exports = app;
