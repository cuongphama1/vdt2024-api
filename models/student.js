const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    gender: String,
    school: String
});

module.exports = mongoose.model('Student', studentSchema);
