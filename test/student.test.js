import { expect } from 'chai';

describe('Student API', () => {
    beforeEach(async () => {
        await Student.deleteMany({});
    });

    it('should list all students', (done) => {
        chai.request(app)
            .get('/api/students')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should create a new student', (done) => {
        const student = { name: 'John Doe', gender: 'Male', school: 'ABC University' };
        chai.request(app)
            .post('/api/students')
            .send(student)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('name', 'John Doe');
                done();
            });
    });

    it('should get a student by id', (done) => {
        const student = new Student({ name: 'Jane Doe', gender: 'Female', school: 'XYZ University' });
        student.save((err, savedStudent) => {
            chai.request(app)
                .get(`/api/students/${savedStudent.id}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('name', 'Jane Doe');
                    done();
                });
        });
    });

    it('should update a student', (done) => {
        const student = new Student({ name: 'John Doe', gender: 'Male', school: 'ABC University' });
        student.save((err, savedStudent) => {
            chai.request(app)
                .put(`/api/students/${savedStudent.id}`)
                .send({ name: 'John Smith' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('name', 'John Smith');
                    done();
                });
        });
    });

    it('should delete a student', (done) => {
        const student = new Student({ name: 'Jane Doe', gender: 'Female', school: 'XYZ University' });
        student.save((err, savedStudent) => {
            chai.request(app)
                .delete(`/api/students/${savedStudent.id}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});
