const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student = require('../models/student'); // Đảm bảo đường dẫn chính xác
const studentRouter = require('../routes/studentRoutes'); // Đảm bảo đường dẫn chính xác

const app = express();
app.use(bodyParser.json());
app.use('/api/students', studentRouter);

// Kết nối MongoDB giả lập cho mục đích test
beforeAll(async () => {
    const url = 'mongodb://127.0.0.1/test_vdt2024';
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
});

// Test cho API list (GET /api/students)
describe('GET /api/students', () => {
    it('should return a list of students', async () => {
        const res = await request(app).get('/api/students');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});

// Test cho API create (POST /api/students)
describe('POST /api/students', () => {
    it('should create a new student', async () => {
        const newStudent = { name: 'Nguyen Van A', gender: 'Nam', school: 'Dai hoc B' };
        const res = await request(app).post('/api/students').send(newStudent);
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual('Nguyen Van A');
        expect(res.body.gender).toEqual('Nam');
        expect(res.body.school).toEqual('Dai hoc B');
    });
});

// Test cho API get (GET /api/students/:id)
describe('GET /api/students/:id', () => {
    it('should return a student by ID', async () => {
        const student = new Student({ name: 'Tran Thi B', gender: 'Nu', school: 'Dai hoc C' });
        await student.save();

        const res = await request(app).get(`/api/students/${student._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Tran Thi B');
        expect(res.body.gender).toEqual('Nu');
        expect(res.body.school).toEqual('Dai hoc C');
    });
});

// Test cho API update (PUT /api/students/:id)
describe('PUT /api/students/:id', () => {
    it('should update an existing student', async () => {
        const student = new Student({ name: 'Le Van C', gender: 'Nam', school: 'Dai hoc D' });
        await student.save();

        const updatedData = { name: 'Le Van C Updated', gender: 'Nam', school: 'Dai hoc D Updated' };
        const res = await request(app).put(`/api/students/${student._id}`).send(updatedData);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Le Van C Updated');
        expect(res.body.school).toEqual('Dai hoc D Updated');
    });
});

// Test cho API delete (DELETE /api/students/:id)
describe('DELETE /api/students/:id', () => {
    it('should delete a student by ID', async () => {
        const student = new Student({ name: 'Pham Thi D', gender: 'Nu', school: 'Dai hoc E' });
        await student.save();

        const res = await request(app).delete(`/api/students/${student._id}`);
        expect(res.statusCode).toEqual(200);
    });
});
