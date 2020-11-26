import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { users_model, post_user_data, post_invalid_parameter } from '../data/user.data.js';
import routes from '../data/path.json';

dotenv.config();
let expect = chai.expect;
chai.use(chaiHttp);

export const user_status = () => {
    it('status', (done) => {
        chai.request(process.env.HOST)
            .get(routes.allUsers)
            .end((error, response) => {
                expect(response).to.have.status(200);
            done();
        });
    });
};

export const user_models = () => {
    it('users models', (done) => {
        chai.request(process.env.HOST)
            .get(routes.allUsers)
            .end((error, response) => {
                const users = response.body;
                users.forEach(user => {
                    Object.keys(users_model).forEach(expectedKey => expect(user).to.have.property(expectedKey));
                });
            done();
        });
    });
};

export const get_user_by_id = () => {
    it('get user by id', (done) => {
        chai.request(process.env.HOST)
            .get(routes.singleUser)
            .end((error, response) => {
                expect(response.body).to.eql(users_model);
            done();
        });
    });  
};

export const get_user_false_id = () => {
    it('get user by non-existing id', (done) => {
        chai.request(process.env.HOST)
            .get(routes.nonExistingId)
            .end((error, response) => {
                expect(response).to.have.status(404);
            done();
        });
    });
};

export const create_user = () => {
    it('create an user', (done) => {
        chai.request(process.env.HOST)
            .post(routes.allUsers)
            .send({...post_user_data})
            .end((error, response) => {
                expect(response).to.have.status(200);
            done();
        });
    }); 
};

export const create_user_false = () => {
    it('create an user with invalid parameter', (done) => {
        chai.request(process.env.HOST)
            .post(routes.allUsers)
            .send({...post_invalid_parameter})
            .end((error, response) => {
                expect(response).to.have.status(403);
            done();
        });
    });
};