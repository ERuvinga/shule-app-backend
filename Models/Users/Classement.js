// Directors model datas

const mongoose = require('mongoose');
const ClassmentShema = mongoose.Schema({
    nameUser:{
        type:String,
        default:""
    },
    
    idUser:{
        type:String,
        default:"",
    },

    max:{
        type:String,
        default:0
    },

    percent:{
        type:String,
        default:0
    },

    placeUser:{
        type:String,
        default:0
    },

    periode:{
        type:String,
        default:""
    },

    promo:{
        type:String,
        default:0
    },

    classeUser:{
        type:String,
        default:""
    }
});

module.exports = mongoose.model("Classement", ClassmentShema);