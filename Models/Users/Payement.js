// Directors model datas

const mongoose = require('mongoose');
const payUser = mongoose.Schema({
    nameUser:{
        type:String,
        default:""
    },
    
    idUser:{
        type:String,
        default:"",
    },

    Time:{
        type:Number,
        default: Date.now()
    },

    pay:{
        type:String,
        default:0
    },

    description:{
        type:String,
        default:""
    }
});

module.exports = mongoose.model("payUSer", payUser);