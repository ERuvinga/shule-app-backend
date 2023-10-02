// Directors model datas

const mongoose = require('mongoose');
const CoursesSchema = mongoose.Schema({
    level:{
        type:String,
        default:""
    },
    
    name:{
        type:String,
        default:"",
    },

    domaine:{
        type:String,
        default: ""
    },

    pond:{
        type:String,
        default:""
    },
    placeList:{
        type:Number,
        default:0
    }
});

module.exports = mongoose.model("cours", CoursesSchema);