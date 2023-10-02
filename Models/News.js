// Directors model datas

const mongoose = require('mongoose');
const NewsSchema = mongoose.Schema({
    nameUser:{
        type:String,
        default:""
    },
    
    Content:{
        type:String,
        default:"",
    },

    time:{
        type:Number,
        default: Date.now()
    },

    title:{
        type:String,
        default:""
    }
});

module.exports = mongoose.model("News", NewsSchema);