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
        default:"",
        unique:true,
    },
    
    tel:{
        type:String,
        default:"",
        unique:true,
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
    },
    passWord:{
        type:String,
        default:""
    },
});

module.exports = mongoose.model('teacher', teacherSchema);