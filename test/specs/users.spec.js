import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { post_user_data, post_invalid_parameter } from '../data/user.data.js';
import routes from '../data/path.json';

dotenv.config();
let expect = chai.expect;
chai.use(chaiHttp);

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