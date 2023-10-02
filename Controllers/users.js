
// modelsusers 
const modelOfStudents = require("../Models/Users/Student"); // import model of students user
const modelTeachers = require("../Models/Users/Teachers"); // import model of Teachers
const modelDirectors = require("../Models/Users/Direction"); // import model of Teachers

// controller Check Auth user
exports.getAllUsers =(req, res)=>{
    let modelUser;
    let AllUsers = []
    
    // find all user
    for(let i = 0; i <= 2; i++){
        switch(i){
            case 0:
                modelUser = modelDirectors;
                break;
            case 1:
                modelUser = modelTeachers;
                break;
            case 2:
                modelUser = modelOfStudents;
                break;
        }

        //search user in dataBase
        modelUser.find()
        .then(userFund =>{
            AllUsers.push(...userFund);
            if(i == 2){
                res.status(200).json({msg:"Utalisateurs All", AllUsers});
            }
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({error});
        })        
    }
};

exports.getAllStudents =(req, res)=>{

        //search AllStudents in dataBase
        modelOfStudents.find()
        .then(userFund =>{
                res.status(200).json({msg:"Utalisateurs All", AllUsers:userFund});
            
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({error});
        })        
};
