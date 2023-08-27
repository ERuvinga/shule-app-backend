// model datas of teachers

const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    allName:{
        type:String,
        default:""
    },
    
    name:{
        type:Object,
        default:{
            first:"",
            second:"",
            last:"",
        }
    },
    email:{
        type:String,
        default:""
    },
    
    tel:{
        type:String,
        default:""
    },

    picture:{
        type:String,
        default:""
    },
    
    CLASS:{
        type:Number,
        default:0,
    },

    stateAccount: {
        type:Boolean,
        default:false,
    }
});

module.exports = mongoose.model('teacher', teacherSchema);