module.exports = {
    greeting(req, res) {
        res.send({msg : 'Hello!'});
    },

    create(req, res) {
        console.log(req.body);
        res.send({hi : 'there'});
    }
};