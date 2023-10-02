// Models
const modelOfStudents = require("../Models/Users/Student"); // import model of students user
const modelOfSTeacher = require("../Models/Users/Teachers"); // import model of students user
const modelOfCours = require("../Models/Courses"); // import model of students user

exports.getUserOfClass = (req, res, next)=>{

    modelOfSTeacher.findOne({_id:req.Autorization.userId})
    .then(dataOfTeacher =>{        
        modelOfStudents.find({$and:[{"registerDatas.CLASS":dataOfTeacher.CLASS},{"registerDatas.PROMOTION":dataOfTeacher.PROMOTION}]})
        .then(datas=>{
            req.DataToTransfert={
                users: datas,
                prom:dataOfTeacher.PROMOTION
            };
            next();
        })
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({msg:"Error server"})
    })
}

exports.getCoursesOfClass = (req, res)=>{
    let levelProm ="";
    if(req.DataToTransfert.prom == 1 || req.DataToTransfert.prom == 2){
        levelProm = "elementaire";
    }

    modelOfCours.find({level:levelProm})
    .then(Courses =>{
        res.status(200).json({Cours:Courses, users:req.DataToTransfert.users});
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({msg:"Error server"})
    })
}