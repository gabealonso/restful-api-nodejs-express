import dotenv from 'dotenv';
import { post_user_data, post_invalid_parameter } from '../data/user.data.js';
import routes from '../data/path.json';
import { post_and_status } from '../lib/common.js';

dotenv.config();

const test_settings = [
    {
        "title": "Create an user",
        "route": routes.allUsers,
        "body": post_user_data,
        "expectedResult": 200
    },
    {
        "title": "Create an user with invalid parameter",
        "route": routes.allUsers,
        "body": post_invalid_parameter,
        "expectedResult": 403
    }
];

export const tests_user_post = () => {
    test_settings.forEach(test => {
        it(test.title, (done) => {
            post_and_status(process.env.HOST, test.route, test.body, test.expectedResult);
            done();
        });
    });
};