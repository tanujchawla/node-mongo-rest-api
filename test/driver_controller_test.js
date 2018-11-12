const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Driver = mongoose.model('driver');

describe('Drivers Controller', () => {

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

    it('Put to /api/drivers to update a driver', (done) => {
        const driver = new Driver({email : 't1@t.com', driving : false});
        driver.save()
            .then(() => {
                request(app)
                .put(`/api/drivers/${driver._id}`)
                .send({driving : true})
                .end(() => {
                    Driver.findOne({email : 't1@t.com'})
                        .then((driver) => {
                            assert(driver.driving === true);
                            done();
                        });
                });
            });
    });

    it('Delete to /api/drivers to delete a driver', (done) => {
        const driver = new Driver({email : 't2@t.com'});

        driver.save()
            .then(() => {
                request(app)
                .delete(`/api/drivers/${driver._id}`)
                .end(() => {
                    Driver.findOne({email : 't2@t.com'})
                        .then((driver) => {
                            assert(driver === null);
                            done();
                        });
                });
            });
    });
});