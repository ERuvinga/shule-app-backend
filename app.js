
// include connect mongoose to cluster mangodb
require("./db/mongo_db");


const express = require('express');
const app = express();  // methode express
const userShema = require('./Models/test');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
    next();
});

app.use('/test', (req, res) => { // fecting user of Test Api

    let datas;
    userShema.find()
    .then(allUsers => {
         datas = {...allUsers};
         res.json(datas);
         res.status(200);
    })
    .catch((error)=> {
        console.log(error);
        res.json({message:"Error server"});
        res.status(200);
    });
});



module.exports = app;
