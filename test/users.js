import chai from 'chai';
import chaiHttp from 'chai-http';
let expect = chai.expect;

chai.use(chaiHttp);

// users_model for test
const users_model = {
    firstName: 'Jennie',
    lastName: 'Kim',
    age: 24,
    email: 'jenniekim@gmail.com',
    id: '0a57b828-9764-4cf4-b50f-504df469a1cd'
}

// tests
describe('users', () => {
    it('status', (done) => {
        chai.request('localhost:5000')
            .get('/users')
            .end((error, response) => {
                expect(response).to.have.status(200);
            done();
        })
    })
    
    it('users models', (done) => {
        chai.request('localhost:5000')
            .get('/users')
            .end((error, response) => {
                const users = response.body;
                users.forEach(user => {
                    Object.keys(users_model).forEach(expectedKey => expect(user).to.have.property(expectedKey));
                });
            done();
        })
    })

    it('get user by id', (done) => {
        chai.request('localhost:5000')
            .get('/users/0a57b828-9764-4cf4-b50f-504df469a1cd')
            .end((error, response) => {
                expect(response.body).to.eql(users_model);
            done();
        })
    })

    it('get user by non-existing id', (done) => {
        chai.request('localhost:5000')
            .get('/users/0a57b828504df469a1cd')
            .end((error, response) => {
                expect(response).to.have.status(404);
            done();
        })
    })

    it('create an user', (done) => {
        chai.request('localhost:5000')
            .post('/users')
            .send({firstName: "Ryu", lastName: "Jin", age: 19, email: "ryujin@gmail.com"})
            .end((error, response) => {
                expect(response).to.have.status(200);
            done();
        })
    })

    it('create an user with invalid parameter', (done) => {
        chai.request('localhost:5000')
            .post('/users')
            .send({firstNam: "Ryu", lastNam: "Jin", ag: 19, emai: "ryujin@gmail.com"})
            .end((error, response) => {
                expect(response).to.have.status(403);
            done();
        })
    })

    it('delete an user', (done) => {
        chai.request('localhost:5000')
            .delete('/users/0a57b828-9764-4cf4-b50f-504df469a1cd')
            .end((error, response) => {
                expect(response).to.have.status(200);
            done();
        })
    })

    it('verify if the user was deleted', (done) => {
        chai.request('localhost:5000')
            .get('/users/0a57b828-9764-4cf4-b50f-504df469a1cd')
            .end((error, response) => {
                expect(response).to.have.status(404);
            done();
        })
    })

    it('delete an user with non-existing id', (done) => {
        chai.request('localhost:5000')
            .delete('/users/0a57b828504df469a1cd')
            .end((error, response) => {
                expect(response).to.have.status(404);
            done();
        })
    })

    // patch tests

    it('update firstName', (done) => {
        chai.request('localhost:5000')
            .patch('/users/9764-0a57b828-4cf4-b50f-504df469a1cd')
            .send({firstName: "Rose"})
            .end((error, response) => {
                expect(response).to.have.status(200);
            done();
        })
    })

    it('update firstName validation', (done) => {
        chai.request('localhost:5000')
            .get('/users/9764-0a57b828-4cf4-b50f-504df469a1cd')
            .end((error, response) => {
                const firstName = response.body.firstName;
                expect(firstName).to.equal('Rose');
            done();
        })
    })

    it('update lastName', (done) => {
        chai.request('localhost:5000')
            .patch('/users/9764-0a57b828-4cf4-b50f-504df469a1cd')
            .send({lastName: "Park"})
            .end((error, response) => {
                expect(response).to.have.status(200);
            done();
        })
    })

    it('update lastName validation', (done) => {
        chai.request('localhost:5000')
            .get('/users/9764-0a57b828-4cf4-b50f-504df469a1cd')
            .end((error, response) => {
                const lastName = response.body.lastName;
                expect(lastName).to.equal('Park');
            done();
        })
    })

    it('update age', (done) => {
        chai.request('localhost:5000')
            .patch('/users/9764-0a57b828-4cf4-b50f-504df469a1cd')
            .send({age: 22})
            .end((error, response) => {
                expect(response).to.have.status(200);
            done();
        })
    })

    it('update age validation', (done) => {
        chai.request('localhost:5000')
            .get('/users/9764-0a57b828-4cf4-b50f-504df469a1cd')
            .end((error, response) => {
                const age = response.body.age;
                expect(age).to.equal(22);
            done();
        })
    })
  
    it('update email', (done) => {
        chai.request('localhost:5000')
            .patch('/users/9764-0a57b828-4cf4-b50f-504df469a1cd')
            .send({email: "rosepark@gmail.com"})
            .end((error, response) => {
                expect(response).to.have.status(200);
            done();
        })
    })

    it('update email validation', (done) => {
        chai.request('localhost:5000')
            .get('/users/9764-0a57b828-4cf4-b50f-504df469a1cd')
            .end((error, response) => {
                const email = response.body.email;
                expect(email).to.equal('rosepark@gmail.com');
            done();
        })
    })
})
