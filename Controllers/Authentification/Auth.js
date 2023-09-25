
const jwt = require("jsonwebtoken");

// modelsusers 
const modelOfStudents = require("../../Models/Users/Student"); // import model of students user
const modelTeachers = require("../../Models/Users/Teachers"); // import model of Teachers
const modelDirectors = require("../../Models/Users/Direction"); // import model of Teachers

// controller Check Auth user
exports.CheckAuthUser =(req, res)=>{
    let token = req.headers.autorization;
    token = token.split(" ")[1];

    try{
        // verify validity token 
        const DataOfToken = jwt.verify(token, process.env.TOKEN_SIGN);
        let modelUser;
        
        // check modelUser
        switch(DataOfToken.modelUser){
            case "modelDirectors":
                modelUser = modelDirectors;
                break;
            case "modelTeachers":
                modelUser = modelTeachers;
                break;
            case "modelOfStudents":
                modelUser = modelOfStudents;
                break;
        }

        // search user in dataBase
        modelUser.findOne({_id:DataOfToken.idUser})
        .then(userFund =>{
            res.status(200).json({msg:"Token valid", userFund});
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({error});
        })
    }
    catch(error){
        console.log(error.message);
        res.status(401).json({error});
    };
};