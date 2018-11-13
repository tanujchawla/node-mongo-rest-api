const Driver = require('../models/driver');

module.exports = {
    greeting(req, res) {
        res.send({msg : 'Hello!'});
    },

    index(req, res, next) {

        const { lng, lat} = req.query;

        Driver.geoNear(
            { type : 'Point', coordinates : [lng, lat] },
            { spherical : true, maxDistance: 200000 }
        ).then((drivers) => res.send(drivers))
        .catch(next);
    },    

    create(req, res, next) {
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next);
    },

    update(req, res, next) {
        const driverId = req.params.id;
        const driverProps = req.body;
        
        Driver.updateOne({_id : driverId}, driverProps)
            .then(() => Driver.findOne({_id : driverId}))
            .then((driver) => res.send(driver))
            .catch(next);
    },

    delete(req, res, next) {
        const driverId = req.params.id;

        Driver.findByIdAndRemove(driverId)
            .then((driver) => res.status(204).send(driver))
            .catch(next);
    }
};