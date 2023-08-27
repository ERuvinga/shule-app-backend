// Logical Method for Login and registers routers

const modelOfStudents = require("../../Models/Users/Student"); // import model of studes user
//const bcrypt = require("bcrypt");
exports.login = (req, res) => {
    console.log(req.body);
    res.status(200).json({mes:"merci"})
};

exports.Activation_account = (req, res) => {
    console.log(req.body);
    res.status(200).json({mes:"merci"});
}

exports.registerNewStudent = (req, res) =>{
    const formData = {
              passWord: "****",
    };

    const student = new modelOfStudents(formData); // created news student with datas of formulaire
    student.save() // saving new objet in data base
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