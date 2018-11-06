const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Driver = mongoose.model('driver');

describe('Drivers Controller', () => {
    
    // beforeEach( done => {
    //     let d1;

    //     d1 = new Driver({email : "test123@test.com" });
    //     d1.save()
    //         .then( () => done());
    // });

    it('Post to /api/drivers to create a new driver', (done) => {
        Driver.count().then(count => {
            request(app)
            .post('/api/drivers')
            .send({ email : 'test1@test.com'})
            .end(() => {
                Driver.count().then(newCount => {
                    assert(count + 1 === newCount);
                    done();
                });
            });
        });
    });
});