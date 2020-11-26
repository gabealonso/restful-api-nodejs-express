import dotenv from 'dotenv';
import routes from '../data/path.json';
import { delete_user } from '../lib/common.js';

dotenv.config();


const test_settings = [
    {
        "title": "Delete user and verify",
        "route": routes.singleUser,
        "expectedResult": 200
    },
    {
        "title": "Delete an user with non-existing id",
        "route": routes.singleUser,
        "expectedResult": 404
    }
];

export const delete_user_tests = () => {
    test_settings.forEach(test => {
        it(test.title, (done) => {
            delete_user(process.env.HOST, test.route, test.expectedResult);
            done();
        });
    });
};