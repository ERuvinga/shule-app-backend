const UserPayed = require("../../Models/Users/Payement");
const ModelStudent = require("../../Models/Users/Student");

// Controller Newpay
exports.NewPaye = (req, res)=>{

    const userPayed = new UserPayed({
        nameUser: req.body.name,
        idUser: req.body.idUser,
        pay:req.body.payed,
        Time:req.body.datePayed
    });

    userPayed.save()
    .then(()=> {
            ModelStudent.findOne({_id:req.body.idUser})
            .then(User =>{
                ModelStudent.updateOne({_id:User._id},{
                    $set:{
                        valuePayed: (req.body.payed) + User.valuePayed,
                        LastDatePayed:req.body.datePayed
                    }
                })
                .then(()=> res.status(200).json({msg:"Nouveau payement reussi"}))
                .catch((error)=> {
                    console.log(error);
                    res.status(400).json({msg:"Error lors du mis à jour des donnees de payement"})
                })
            })
}    )
    .catch((error)=> res.status(400).json({msg:"Error lors des L'Enregistrement"}))
}

