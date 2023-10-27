// proclammation model datas

const mongoose = require('mongoose');
const ProclammationShema = mongoose.Schema({
    namePeriode:{
        type:String,
        default:""
    },

    Dates:{
        type:String,
        default:""
    }
});

module.exports = mongoose.model("DatesPro", ProclammationShema);