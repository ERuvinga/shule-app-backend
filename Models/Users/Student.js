// students models datas of users

const mongoose = require("mongoose");
const StudentSchema = mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    postName:{
        type:String,
        default:""
    },

    otherName:{
        type:String,
        default:""
    },

    matricule:{
        type:String,
        default:""
    },
    passWord:{
        type:String,
        default:""
    },
});

module.exports = mongoose.model("Student", StudentSchema);
