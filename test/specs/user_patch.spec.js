import { update_user }  from '../lib/common.js';
import routes from '../data/path.json';
import dotenv from 'dotenv';

dotenv.config();
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

export const patch_tests = () => {
    patch_config_test.forEach(testConfig => {
        it(testConfig.title, (done) => {
            update_user(process.env.HOST, routes.updateUser, testConfig.body, testConfig.expectedResult, testConfig.key);
            done();
        });
    });
};