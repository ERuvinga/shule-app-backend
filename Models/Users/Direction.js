// Directors model datas

const mongoose = require('mongoose');
const DirectorSchema = mongoose.Schema({
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
        unique:true
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
    
    task:{
        type:Object,
        default:{
            funct:"DIRECTOR",
            level: 1,
        },
    },

    passWord:{
        type:String,
        default:""
    },

    stateAccount: {
        type:Boolean,
        default:false,
    }
});

module.exports = mongoose.model("director", DirectorSchema);