import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { users_model, post_user_data, post_invalid_parameter } from './data/user.data.js';
import routes from './path.json';
import { update }  from './lib/common.js';

dotenv.config();
let expect = chai.expect;
chai.use(chaiHttp);


// tests
describe('users', () => {
    it('status', (done) => {
        console.log(`${process.env.HOST}`);
        chai.request(`${process.env.HOST}`)
            .get(routes.allUsers)
            .end((error, response) => {
                expect(response).to.have.status(200);
            done();
        })
    })
    
    it('users models', (done) => {
        chai.request(`${process.env.HOST}`)
            .get(routes.allUsers)
            .end((error, response) => {
                const users = response.body;
                users.forEach(user => {
                    Object.keys(users_model).forEach(expectedKey => expect(user).to.have.property(expectedKey));
                });
            done();
        })
    })

    it('get user by id', (done) => {
        chai.request(`${process.env.HOST}`)
            .get(routes.singleUser)
            .end((error, response) => {
                expect(response.body).to.eql(users_model);
            done();
        })
    })

    it('get user by non-existing id', (done) => {
        chai.request(`${process.env.HOST}`)
            .get(routes.nonExistingId)
            .end((error, response) => {
                expect(response).to.have.status(404);
            done();
        })
    })

    it('create an user', (done) => {
        chai.request(`${process.env.HOST}`)
            .post(routes.allUsers)
            .send({...post_user_data})
            .end((error, response) => {
                expect(response).to.have.status(200);
            done();
        })
    })

    it('create an user with invalid parameter', (done) => {
        chai.request(`${process.env.HOST}`)
            .post(routes.allUsers)
            .send({...post_invalid_parameter})
            .end((error, response) => {
                expect(response).to.have.status(403);
            done();
        })
    })

    it('delete an user', (done) => {
        chai.request(`${process.env.HOST}`)
            .delete(routes.singleUser)
            .end((error, response) => {
                expect(response).to.have.status(200);
            done();
        })
    })

    it('verify if the user was deleted', (done) => {
        chai.request(`${process.env.HOST}`)
            .get(routes.singleUser)
            .end((error, response) => {
                expect(response).to.have.status(404);
            done();
        })
    })

    it('delete an user with non-existing id', (done) => {
        chai.request(`${process.env.HOST}`)
            .delete(routes.nonExistingId)
            .end((error, response) => {
                expect(response).to.have.status(404);
            done();
        })
    })

    // patch tests

    const patch_config_test = [
        {
            title: 'update firstname and validate',
            body: {firstName: "Rose"},
            expectedResult: 'Rose',
            key: 'firstName'
        },
        {
            title: 'update lastName and validate',
            body: {lastName: "Park"},
            expectedResult: 'Park',
            key: 'lastName' 
        },
        {
            title: 'update age and validate',
            body: {age: 22},
            expectedResult: 22,
            key: 'age'  
        },
        {
            title: 'update email and validate',
            body:  { email: "rosepark@gmail.com" },
            expectedResult: "rosepark@gmail.com",
            key: 'email'   
        },
    ];

    patch_config_test.forEach(testConfig => {
        it(testConfig.title, (done) => {
            update(process.env.HOST, routes.updateUser, testConfig.body, testConfig.expectedResult, testConfig.key);
            done();
        });
    });

})
