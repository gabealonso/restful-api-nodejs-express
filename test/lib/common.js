import chai from 'chai';
let expect = chai.expect;

/**
 * 
 * @param {String} host 
 * @param {String} route 
 * @param {Number} expectedStatus 
 */

export const get_and_status = (host, route, expectedStatus) => {
    chai.request(host)
    .get(route)
    .end((error, response) => {
        expect(response).to.have.status(expectedStatus)
    });
};


/**
 * 
 * @param {String} host 
 * @param {String} route 
 * @param {Object} expectedResult 
 * @param {String} bodyParam 
 */

export const validate_user_updated = (host, route, expectedResult, bodyParam) => {
    chai.request(host)
    .get(route)
    .end((error, response) => {
        const obtainedResult = response.body[bodyParam];
        expect(obtainedResult).to.equal(expectedResult);
    });
};


/**
 * 
 * @param {String} host 
 * @param {String} route 
 * @param {Object} sendObject 
 * @param {Any} expectedResult 
 * @param {String} bodyParam 
 */

export const update_user = (host, route, sendObject, expectedResult, bodyParam) => {
    chai.request(host)
    .patch(route)
    .send(sendObject)
    .end((error, response) => {
        validate_user_updated(host, route, expectedResult, bodyParam)
        expect(response).to.have.status(200);
    });
};


/**
 * 
 * @param {String} host 
 * @param {String} route 
 * @param {Number} expectedStatus 
 */

export const delete_user = (host, route, expectedStatus) => {
    chai.request(host)
    .delete(route)
    .end((error, response) => {
        expect(response).to.have.status(expectedStatus);
        get_and_status(host, route, 404);
    });
};


/**
 * 
 * @param {String} host 
 * @param {String} route 
 * @param {Object} body 
 * @param {Number} expectedStatus 
 */

export const post_and_status = (host, route, body, expectedStatus) => {
    chai.request(host)
    .post(route)
    .send({...body})
    .end((error, response) => {
        expect(response).to.have.status(expectedStatus);
    });
};


/**
 * 
 * @param {Object} expectedModel 
 * @param {Object} obtainedModel 
 */

export const validate_model = (expectedModel, obtainedModel) => {
    Object.keys(expectedModel).forEach(expectedKey => {
        expect(obtainedModel).to.have.property(expectedKey)
    });
};