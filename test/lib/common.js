import chai from 'chai';
let expect = chai.expect;

/**
 * 
 * @param {String} host 
 * @param {String} route 
 * @param {Object} expectedResult 
 * @param {String} bodyParam 
 */
export const validate = (host, route, expectedResult, bodyParam) =>{
    chai.request(host)
    .get(route)
    .end((error, response) => {
        const obtainedResult = response.body[bodyParam];
        expect(obtainedResult).to.equal(expectedResult);
    });
}

/**
 * 
 * @param {String} host 
 * @param {String} route 
 * @param {Object} sendObject 
 * @param {Any} expectedResult 
 * @param {String} bodyParam 
 */
export const update = (host, route, sendObject, expectedResult, bodyParam) => {
    chai.request(host)
    .patch(route)
    .send(sendObject)
    .end((error, response) => {
        validate(host, route, expectedResult, bodyParam)
        expect(response).to.have.status(200);
    });
};