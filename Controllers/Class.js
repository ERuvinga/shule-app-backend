// Models
const modelOfStudents = require("../Models/Users/Student"); // import model of students user
const modelOfSTeacher = require("../Models/Users/Teachers"); // import model of students user
const modelOfCours = require("../Models/Courses"); // import model of students user
const modelCotesStudents = require("../Models/CotesStudents");
const modelClassMent = require("../Models/Users/Classement"); //import Model of ClassementStudents
const modelDatesProclam = require("../Models/Proclammations");

exports.getUserOfClass = (req, res, next)=>{

    modelOfStudents.find({$and:[{"registerDatas.CLASS":req.Autorization.ClassUser},{"registerDatas.PROMOTION":req.Autorization.promoUser}]})
    .then(datas=>{
        req.DataToTransfert={
                users: datas,
                prom:req.Autorization.promoUser,
                classUser:req.Autorization.ClassUser
        };
        next();
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({msg:"Error server"})
    })
}

exports.SavingCote = (req, res)=>{

    const Data = req.body;
    let compt = 0;
    let error = true;

    Data.map((value, index)=>{
        const Cotes = new modelCotesStudents(value);
        modelCotesStudents.findOne({$and:[{NameCourse:value.NameCourse},{idStudent:value.idStudent},{idTeacher:value.idTeacher},{periode:value.periode}]})
        .then((datas) => {
                console.log(datas);
                compt++

                if(datas){
                    modelCotesStudents.updateOne({$and:[{NameCourse:value.NameCourse},{idStudent:value.idStudent},{idTeacher:value.idTeacher},{periode:value.periode}]},{...value})
                    .then(()=> {
                        console.log("mise A jours reussi");
                        if(compt === Data.length && error){
                            res.status(200).json({msg:"mise A jours reussi"});
                            error = false;
                        }
                    })
                }

                else{
                    Cotes.save()
                    .then(()=>{
                        console.log("Saved reussit")
                        if(compt === Data.length && error){
                            res.status(200).json({msg:"Enregistrement reussi"});
                            error = false;
                        }                        
                    })
                }

            }
        )
        .catch(error=>{
            console.log(error);
            res.status(500).json({msg:"Error server"})
        })
    })

}

exports.getCoursesOfClass = (req, res)=>{
    console.log(req.DataToTransfert)
    let levelProm ="";
    if(req.DataToTransfert.prom == 1 || req.DataToTransfert.prom == 2){
         levelProm = "elementaire";
        }
    else if(req.DataToTransfert.prom == 3 || req.DataToTransfert.prom == 4){
        levelProm = "intermediaure";
    }
    else if(req.DataToTransfert.prom == 5 || req.DataToTransfert.prom == 6){
        levelProm = "terminal";
    };
        
    modelOfCours.find({level:levelProm})
    .then(Courses =>{
        res.status(200).json({Cours:Courses, users:req.DataToTransfert.users});
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({msg:"Error server"})
    })
}


exports.StudentSearchCourses =(req, res)=>{
    let levelProm= "";
    let PonderationTot = 0;
    const DatasOfStudent = req.Autorization;
    
    if(DatasOfStudent.promoUser == 1 || DatasOfStudent.promoUser == 2){
         levelProm = "elementaire";
        }
    else if(DatasOfStudent.promoUser == 3 || DatasOfStudent.promoUser == 4){
        levelProm = "intermediaure";
    }
    else if(DatasOfStudent.promoUser == 5 || DatasOfStudent.promoUser == 6){
        levelProm = "terminal";
    };
        
    modelOfCours.find({level:levelProm})
    .then(Courses =>{
        Courses.map((value)=>{
            PonderationTot += parseInt(value.pond); 
        });
        res.status(200).json({Cours:Courses,PonderationTot})
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({msg:"Error server"})
    })
}

exports.getCotesOfStudent = (req, res)=>{
    let Results={ // Resultat of Users
        period_1:{
            max:0,
            place:0
        },

        period_2:{
            max:0,
            place:0
        },    
        examen_1:{
            max:0,
            place:0
        },   
        period_3:{
            max:0,
            place:0
        },

        period_4:{
            max:0,
            place:0
        },    
        examen_2:{
            max:0,
            place:0
        },
        period_5:{
            max:0,
            place:0
        },

        period_6:{
            max:0,
            place:0
        },    
        examen_3:{
            max:0,
            place:0
        },
        Trim1:{
            max:0,
            place:0,
        },
        Trim2:{
            max:0,
            place:0
        },
        Trim3:{
            max:0,
            place:0,
        },
        TotGen:{
            max:0,
            place:0
        }      
    };
    
    modelCotesStudents.find({idStudent: req.Autorization.userId})
    .then(datas =>{
        console.log("Donnees trouvées");
        datas.map((value)=>{
            switch(value.periode){
                case '1P':
                    Results={
                        ...Results,
                        period_1:{
                            ...Results.period_1,
                            max:Results.period_1.max + parseInt(value.cote),
                        }
                };
                break;

                case '2P':
                    Results={
                        ...Results,
                        period_2:{
                            ...Results.period_2,
                            max:Results.period_2.max + parseInt(value.cote),
                        }
                };
                break;

                case 'Examen1':
                    Results={
                        ...Results,
                        examen_1:{
                            ...Results.examen_1,
                            max:Results.examen_1.max + parseInt(value.cote),
                        }
                };
                break;
                case '3P':
                    Results={
                        ...Results,
                        period_3:{
                            ...Results.period_3,
                            max:Results.period_3.max + parseInt(value.cote),
                        }
                };
                break;

                case '4P':
                    Results={
                        ...Results,
                        period_4:{
                            ...Results.period_4,
                            max:Results.period_4.max + parseInt(value.cote),
                        }
                };
                break;

                case 'Examen2':
                    Results={
                        ...Results,
                        examen_2:{
                            ...Results.examen_2,
                            max:Results.examen_2.max + parseInt(value.cote),
                        }
                };
                break;
                case '5P':
                    Results={
                        ...Results,
                        period_5:{
                            ...Results.period_5,
                            max:Results.period_5.max + parseInt(value.cote),
                        }
                };
                break;

                case '6P':
                    Results={
                        ...Results,
                        period_6:{
                            ...Results.period_6,
                            max:Results.period_6.max + parseInt(value.cote),
                        }
                };
                break;

                case 'Examen3':
                    Results={
                        ...Results,
                        examen_3:{
                            ...Results.examen_3,
                            max:Results.examen_3.max + parseInt(value.cote),
                        }
                };
                break;
            }
        });
        Results = {
            ...Results,
            Trim1: {
                ...Results.Trim1,
                max:Results.period_1.max + Results.period_2.max + Results.examen_1.max
            },
            Trim2: {
                ...Results.Trim2,
                max:Results.period_3.max + Results.period_4.max + Results.examen_2.max
            },
            Trim3: {
                ...Results.Trim3,
                max:Results.period_5.max + Results.period_6.max + Results.examen_3.max
            },
            TotGen: {
                ...Results.TotGen,
                max:Results.period_1.max + Results.period_2.max + Results.examen_1.max + Results.period_3.max + Results.period_4.max + Results.examen_2.max + Results.period_5.max + Results.period_6.max + Results.examen_3.max
            },
        }
        modelDatesProclam.find()
        .then(datesProclam =>{
            console.log(datesProclam);          
            res.status(200).json({Cotes:datas, Resultat:Results, datesProclam });  
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({msg:"error server"});       
        })
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({msg:"error server"});
    })
}

exports.getFicheStudent = (req, res)=>{
    const DatasOfStudent = req.body;
    
    modelCotesStudents.find({idStudent: DatasOfStudent.idStudent})
    .then(datas =>{
        console.log("Donnees trouvées");
        res.status(200).json({Cotes:datas});
    })

    .catch(error =>{
        console.log(error);
        res.status(500).json({msg:"error server"});
    })
}