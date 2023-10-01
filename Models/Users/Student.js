// students models datas of users

const mongoose = require("mongoose");
const StudentSchema = mongoose.Schema({
    allName :{
        type:String,
        default:""
    },

    name:{
        type:Object,
        default:{
            first:"",
            second:"",
            last:""
        }
    },
    birthDatas:{
        type:Object,
        default:{
            date:"",
            location:""
        }
    },

    location:{
        type:String,
        default:""
    },
    registerDatas:{
        type:Object,
        default:{
            DATE:Date.now(),
            CLASS: "A",
            PROMOTION: 1,
        }
    },

    passWord:{
        type:String,
        default:""
    },

    stateAccount:{
        type:Boolean,
        default: false
    },

    typeAccount:{
        type:String,
        default:"Student"
    },

    picture:{
        type:String,
        default:""
    },
    valuePayed:{
        type:Number,
        default: 0
    },

    LastDatePayed:{
        type:Number,
        default: Date.now()
    },
    //tutaire Datas
    dataOfTutaire:{
        type:Object,
        default:{
            name:"",
            postName:"",
            latName: "",
            email: "",
            tel:"",
            location:""
        }
    },
});

module.exports = mongoose.model("Student", StudentSchema);
