
// include connect mongoose to cluster mangodb
require("./db/mongo_db");

const express = require('express');
const app = express();  // methode express
const testRouter = require('./Routes/test');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
    next();
});

app.get('/test', testRouter); // router checking if remote server runing

module.exports = app;
