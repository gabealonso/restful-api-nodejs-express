import {
    user_status,
    user_models,
    get_user_by_id,
    get_user_false_id,
    create_user,
    create_user_false
} from './specs/users.spec.js';

import { patch_tests } from './specs/user_patch.spec.js'

import { 
    delete_an_user, 
    false_delete 
} from './specs/user_delete.spec.js';


describe('Users', () => {
    user_status();
    user_models();
    get_user_by_id();
    get_user_false_id();
    create_user();
    create_user_false();
});

describe('Patch User', () => {
    patch_tests();
})

describe('Delete user', () => {
    delete_an_user();
    false_delete();
});

