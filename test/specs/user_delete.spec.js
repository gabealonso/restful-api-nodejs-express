import dotenv from 'dotenv';
import routes from '../data/path.json';
import { delete_user } from '../lib/common.js';

dotenv.config();

export const delete_an_user = () => {
    it('delete user and verify', (done) => {
        delete_user(process.env.HOST, routes.singleUser, 200);
        done();
    });
};

export const false_delete = () => {
    it('delete an user with non-existing id', (done) => {
        delete_user(process.env.HOST, routes.nonExistingId, 404);
        done();
    });
};