const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('Drivers Controller', () => {
    it('Post to /api/drivers to create a new driver', (done) => {
        request(app)
            .post('/api/drivers')
            .send({ email : 'test1@test.com'})
            .end(() => {
                done();
            });
    });
});