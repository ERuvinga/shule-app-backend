// Directors model datas

const mongoose = require('mongoose');
const CotesSchema = mongoose.Schema({
    cote:{
        type:String,
        default:""
    },
    
    idStudent:{
        type:String,
        default:"",
    },

    idTeacher:{
        type:String,
        default: ""
    },

        
    periode:{
        type:String,
        default:"",
    },

    NameCourse:{
        type:String,
        default: ""
    },

    CLASS:{
        type:String,
        default:""
    },
    PROMOTION:{
        type:Number,
        default:0
    }
});

module.exports = mongoose.model("cotes", CotesSchema);
