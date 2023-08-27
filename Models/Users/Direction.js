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
    
    task:{
        type:Object,
        default:{
            funct:"DIRECTOR",
            level: 1,
        },
    },

    stateAccount: {
        type:Boolean,
        default:false,
    }
});

module.exports = mongoose.model("director", DirectorSchema);