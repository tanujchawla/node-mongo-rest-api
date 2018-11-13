const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();
require('dotenv').config();

mongoose.Promise = global.Promise;
if(process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/muber', {useNewUrlParser:true});
    mongoose.connection.once('open', () => console.log('connected to muber')).on('error', (error) => console.log(error));
} else if(process.env.NODE_ENV === 'test') {
    mongoose.connect('mongodb://localhost/muber_test', {useNewUrlParser:true});
    mongoose.connection.once('open', () => console.log('connected to muber_test')).on('error', (error) => console.log(error));
}

app.use(bodyParser.json());
routes(app);

app.use((err, req,res, next) => {
    res.status(422).send({error : err._message});
});

module.exports = app;