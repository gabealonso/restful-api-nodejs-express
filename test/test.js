import {
    user_status,
    user_models,
    get_user_by_id,
    get_user_false_id
} from './specs/user_get.spec.js'

import {
    tests_user_post
} from './specs/user_post.spec.js';

import { 
    patch_tests 
} from './specs/user_patch.spec.js'

import { 
    delete_user_tests
} from './specs/user_delete.spec.js';


describe('Get - User', () => {
    user_status();
    user_models();
    get_user_by_id();
    get_user_false_id();
});

describe('Post - User', () => tests_user_post());

describe('Patch - User', () => patch_tests());

describe('Delete - User', () => delete_user_tests());

