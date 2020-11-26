import {
    user_status,
    user_models,
    get_user_by_id,
    get_user_false_id
} from './specs/user_get.spec.js'

import {
    create_user,
    create_user_false
} from './specs/users.spec.js';

import { 
    patch_tests 
} from './specs/user_patch.spec.js'

import { 
    delete_an_user, 
    false_delete 
} from './specs/user_delete.spec.js';


describe('Get - User', () => {
    user_status();
    user_models();
    get_user_by_id();
    get_user_false_id();
});

describe('Patch - User', () => {
    patch_tests();
})

describe('Delete - User', () => {
    delete_an_user();
    false_delete();
});

