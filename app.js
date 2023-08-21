
// notre Application EPRESS

const express = require('express');
const app = express();  // methode express

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
    next();
});

app.use('/test', (req, res) => {

    const datas = [
        {
            _id: '1234',
            title: "Node Api test root",
            description: "Web dev",
            Autor: "Elie_Ruvinga"
        }
    ]
    res.json(datas);
    res.status(200);
});



module.exports = app;
