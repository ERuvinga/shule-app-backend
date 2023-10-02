
// connexion node Api to cluster Mongo
require('dotenv').config(); // config and import .env file 
const mongoose = require("mongoose");
const Local_uri = process.env.LOCAL_URI+"/shule_App";
const Remote_uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PWD}@neema.mke4ipc.mongodb.net/shule-App`
const connexion_options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(Local_uri, connexion_options)
    .then(()=>{
     console.log("Api Connect to Local DataBase");
    })
    .catch(()=>{
        mongoose.connect(Remote_uri, connexion_options)
        .then(()=>{
            console.log("Api Connect to Remote DataBase");
        })
        .catch(error => console.log("Error: "+ error.code+ ' '+ error.hostname));
    });