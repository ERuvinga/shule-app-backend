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
        type:String,
        default:"A",
    },

    PROMOTION:{
        type:Number,
        default:1,
    },

    stateAccount: {
        type:Boolean,
        default:false,
    },
    
    typeAccount:{
        type:String,
        default:"Teacher"
    },

    passWord:{
        type:String,
        default:""
    },
});

module.exports = mongoose.model('teacher', teacherSchema);