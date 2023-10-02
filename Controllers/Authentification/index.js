// Logical Method for Login and registers routers

//Models
const modelOfStudents = require("../../Models/Users/Student"); // import model of students user
const modelTeachers = require("../../Models/Users/Teachers"); // import model of Teachers
const modelDirectors = require("../../Models/Users/Direction"); // import model of Teachers

//Lib
require("dotenv").config();
const bcrypt = require("bcrypt"); // salting password Methode
const jwt = require("jsonwebtoken");
const SALTE_PWD = 10;

exports.login = (req, res) => {
    const messageInactifAccount = "Ce Compte n'est pas encore Activé, Verifier Votre Matricule dans boite mail";
    // cheking type of Account
    switch(req.body.typeAccount){
        case "Elv":{
            modelOfStudents.findOne({$or:[{"dataOfTutaire.email":req.body.email},{"dataOfTutaire.tel":req.body.email}]})
            .then(StudentFund =>{
                if(StudentFund === null){
                    res.status(401).json({msg:"Aucun Eleve Trouvé avec ces Identités"}) 
                }

                else{
                    if(StudentFund.stateAccount){
                        bcrypt.compare(req.body.passWord, StudentFund.passWord)
                        .then(valid =>{
                            if(!valid){
                                res.status(401).json({msg:"email, Tel ou mot de pass du student Incorrect"})  
                            }

                            else{
                            const Token = jwt.sign({
                                    idUser:StudentFund._id,
                                    mail:StudentFund.email,
                                    modelUser:"modelOfStudents"
                                },process.env.TOKEN_SIGN);
                                res.status(200).json({msg:"Student trouvé", Token, DataUser:StudentFund, typeAccount:"Student"});
                            }
                        })
                        .catch(error => console.log(error))
                    }

                    else{
                        res.status(401).json({msg:messageInactifAccount})
                    }  
                }
            })
            .catch(error =>{
                 console.log(`Error Database ${error}`) // if Error  Connexion to dataBase
                 res.status(500).json({msg:"Erreur server"}) 
              });
            break;
        }

        case "Ens":{
            // Search in Teacher Collection User
            modelTeachers.findOne({$or:[{"email":req.body.email},{"tel":req.body.email}]})
            .then(TeacherFund=>{
                if(TeacherFund === null){
                    res.status(401).json({msg:"Aucun Enseignant Trouvé avec ces Identités"})  
                }
                else{
                    if(TeacherFund.stateAccount){
                        bcrypt.compare(req.body.passWord, TeacherFund.passWord)
                        .then(valid =>{
                            if(!valid){
                                res.status(401).json({msg:"email, Tel ou mot de pass de l'ensignant Incorrect"})  
                            }

                            else{
                            const Token = jwt.sign({
                                    idUser: TeacherFund._id,
                                    mail: TeacherFund.email,
                                    modelUser:"modelTeachers"
                                },process.env.TOKEN_SIGN);
                                res.status(200).json({msg:"Teacher trouvé", Token, DataUser:TeacherFund, typeAccount:"Teacher"});
                            }
                        })
                        .catch(error => console.log(error))
                    }

                    else{
                        res.status(401).json({msg:messageInactifAccount})
                    }  
                }
            })
            .catch(error =>{
                console.log(`Error Database ${error}`) // if Error  Connexion to dataBase
                res.status(500).json({msg:"Erreur server"}) 
             });
            break;
        }

        case "Dir":{
            // Searching in Director Collection User
            modelDirectors.findOne({$or:[{"email":req.body.email},{"tel":req.body.email}]})
            .then(DirectorFund =>{
                        if(DirectorFund === null){
                            res.status(401).json({msg:"Aucun Directeur Trouvé avec ces Identités"}) 
                        }
                        
                        else{
                                if(DirectorFund.stateAccount){
                                    bcrypt.compare(req.body.passWord, DirectorFund.passWord)
                                    .then(valid =>{
                                        if(!valid){
                                            res.status(401).json({msg:"email, Tel ou mot de pass du Directeur Incorrect"})  
                                        }

                                        else{
                                        const Token = jwt.sign({
                                                idUser:DirectorFund._id,
                                                mail:DirectorFund.email,
                                                modelUser:"modelDirectors"
                                            },process.env.TOKEN_SIGN);
                                            res.status(200).json({msg:"Director trouvé", Token, DataUser:DirectorFund, typeAccount:"Director"});
                                        }
                                    })
                                    .catch(error => console.log(error))
                                }

                                else{
                                    res.status(401).json({msg:messageInactifAccount})
                                }                                
                        }
            })
            .catch(error =>{
                console.log(`Error Database ${error}`) // if Error  Connexion to dataBase
                res.status(500).json({msg:"Erreur server"}) 
             });
        }
    }
};

exports.Activation_account = (req, res) => {
    const idUser = req.body.matricule.split("_")[1]; //cup IdUser in matricule
    let userDetected = 0;

    // SEARCHING uSER IN DATABASE
    //1 Students.Collection
    try{
        modelOfStudents.findOne({_id:idUser})
        .then(userFund =>{
            if(userFund){
                userDetected += 1; // if user detected, Incremente value
                if(userFund.stateAccount){
                    res.status(403).json({msg:"Votre Compte est deja Activé, Connectez-vous!", Updating:false, actif:true});
                }
                else{
                    // hashing PassWord
                    bcrypt.hash(req.body.passWord, SALTE_PWD)
                    .then(passwordHash =>{
                        modelOfStudents.updateOne({_id:idUser},{
                            $set:{
                                passWord:passwordHash,
                                stateAccount: true  
                            }
                        })
                        .then(()=>{
                            res.status(200).json({msg:"Activation du compte Reussi", Updating:true, actif:true});
                        })
    
                        .catch((error)=>{
                            console.log(error);
                            res.status(500).json({msg:"Activation echouée, Error Server"});
                        })  
                    })
                    .catch(error => {
                        console.log(`Erreur lors du hashing du password \n ${error}`)
                        res.status(500).json({msg:"Impossible d'activer le compte Error Server lors du hashing du password"});
                    });
               }
            }
        })
        .catch(error =>{
            console.log(error)
            res.status(500).json({msg:"Error Server"});
        })
    }
    catch{(error)=>{
        console.log(error);
        res.status(500).json({msg:"Error Server"});
    }}

        // 2 Teachers.Collection
        try{
            modelTeachers.findOne({_id:idUser})
            .then(userFund =>{
                if(userFund){
                    userDetected += 1; // if user detected, Incremente value
                    if(userFund.stateAccount){
                        res.status(403).json({msg:"Votre Compte est deja Activé, Connectez-vous!", Updating:false, actif:true});
                    }
                    else{
                        // hashing PassWord
                        bcrypt.hash(req.body.passWord, SALTE_PWD)

                        .then(passwordHash =>{
                            modelTeachers.updateOne({_id:idUser},{
                                $set:{
                                    passWord:passwordHash,
                                    stateAccount: true  
                                }
                            })
                            .then(()=>{
                                res.status(200).json({msg:"Activation du compte Reussi", Updating:true, actif:true});
                            })
        
                            .catch((error)=>{
                                console.log(error);
                                res.status(500).json({msg:"Activation echouée, Error Server"});
                            })  
                        })
                        .catch(error => {
                            console.log(`Erreur lors du hashing du password \n ${error}`)
                            res.status(500).json({msg:"Impossible d'activer le compte Error Server lors du hashing du password"});
                        });
                   }
                }
            })
            .catch(error =>{
                console.log(error)
                res.status(500).json({msg:"Error Server"});
            })
        }
        catch{(error)=>{
            console.log(error);
            res.status(500).json({msg:"Error Server"});
        }}


        // 3 Director.Collection
        try{
            modelDirectors.findOne({_id:idUser})
            .then(userFund =>{
                if(userFund){
                    if(userFund.stateAccount){
                        res.status(403).json({msg:"Votre Compte est deja Activé, Connectez-vous!", Updating:false, actif:true});
                    }
                    else{
                        // hashing PassWord
                        bcrypt.hash(req.body.passWord, SALTE_PWD)
                        .then(passwordHash =>{
                            modelDirectors.updateOne({_id:idUser},{
                                $set:{
                                    passWord:passwordHash,
                                    stateAccount: true  
                                }
                            })
                            .then(()=>{
                                res.status(200).json({msg:"Activation du compte Reussi", Updating:true, actif:true});
                            })
        
                            .catch((error)=>{
                                console.log(error);
                                res.status(500).json({msg:"Activation echouée, Error Server"});
                            })  
                        })
                        .catch(error => {
                            console.log(`Erreur lors du hashing du password \n ${error}`)
                            res.status(500).json({msg:"Impossible d'activer le compte Error Server lors du hashing du password"});
                        });
                   }
                }
                else{
                    //console.log(userDetected)
                    if(!userDetected){
                        console.log("aucun Compte Correspondant");
                        res.status(404).json({msg:"Desolé: Votre Matricule ne correspond à aucun compte!"});                        
                    }
                }
            })
            .catch(error =>{
                console.log(error)
                res.status(500).json({msg:"Error Server"});
            })
        }
        catch{(error)=>{
            console.log(error);
            res.status(500).json({msg:"Error Server"});
        }}
    }


// Register New Teacher
exports.registerNewDirector = (req, res) =>{
    const formData = {
              email: req.body.matricule,
              passWord :req.body.passWord
    };

    const Director = new modelDirectors(formData); // created new director user with datas of formulaire
    Director.save() // saving new objet in data base
    .then((datas)=> {
        res.status(200);
        res.json({message: "'success': New Director created"});

        // Send a email message to news Director, content matricule _id
        console.log(datas);
    })
    .catch(error =>{
        console.log(error);
        res.status(500);
        res.json({message: "'Error': Error Server"});
    });
};

// Register New Teacher
exports.registerNewTeacher = (req, res) =>{
    const DatasOfForm = req.body;
    const formData = {
        allName: `${DatasOfForm.firstName} ${DatasOfForm.SecondName} ${DatasOfForm.LastName}`,
        name:{
            first:DatasOfForm.firstName,
            second:DatasOfForm.SecondName,
            last:DatasOfForm.LastName
        },
        email:DatasOfForm.email,
        tel:DatasOfForm.tel,
        CLASS:DatasOfForm.classTeacher,
        PROMOTION:parseInt(DatasOfForm.promition)
    };
      
    const newTeacher = new modelTeachers(formData); // created news Teacher with datas of formulaire
    newTeacher.save() // saving new objet in data base
    .then((datas)=> {
        res.status(200);
        res.json({message: "'success': New teacher created"});

        // Send a email message to news Teache, content matricule _id
    })
    .catch(error =>{
        console.log(error);
        res.status(500);
        res.json({message: "'Error': Error Server"});
    });
};

//Register New Student

exports.registerNewStudent = (req, res) =>{

    const DatasOfForm = req.body;
    const formData = {
        allName: `${DatasOfForm.firstName} ${DatasOfForm.SecondName} ${DatasOfForm.LastName}`,
        name:{
            first:DatasOfForm.firstName,
            second:DatasOfForm.SecondName,
            last:DatasOfForm.LastName
        },
        birthDatas:{
            date:DatasOfForm.BornDay,
            location:DatasOfForm.BordLocation
        },
        dataOfTutaire:{
            name:DatasOfForm.RespFirstName,
            postName:DatasOfForm.RespSecondName,
            email:DatasOfForm.RespEmail,           
            tel:DatasOfForm.RespTel,
            latName: "",
            location:"",
        },
        registerDatas:{
            DATE:Date.now(),
            CLASS:DatasOfForm.classStudent,
            PROMOTION:parseInt(DatasOfForm.promition)
        }
    };

    const newStudent = new modelOfStudents(formData); // created news student with datas of formulaire
    newStudent.save() // saving new objet in data base
    .then((datas)=> {
        res.status(200);
        res.json({message: "'success': New student created"});

        // Send a email message to news student, content matricule _id
        console.log(datas);
    })
    .catch(error =>{
        console.log(error);
        res.status(500);
        res.json({message: "'Error': Error Server"});
    });
};