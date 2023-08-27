// Logical Method for Login and registers routers

//Models
const modelOfStudents = require("../../Models/Users/Student"); // import model of students user
const modelTeachers = require("../../Models/Users/Teachers"); // import model of Teachers
const modelDirectors = require("../../Models/Users/Direction"); // import model of Teachers

//const bcrypt = require("bcrypt");
exports.login = (req, res) => {
    console.log(req.body);
    res.status(200).json({mes:"merci"})
};

exports.Activation_account = (req, res) => {
    console.log(req.body);
    res.status(200).json({mes:"merci"});
}


// Register New Teacher
exports.registerNewDirector = (req, res) =>{
    const formData = {
              passWord: "****",
    };

    const teacher = new modelDirectors(formData); // created new director user with datas of formulaire
    teacher.save() // saving new objet in data base
    .then((datas)=> {
        res.status(200);
        res.json({message: "'success': New teacher created"});

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
    const formData = {
              passWord: "****",
    };

    const teacher = new modelTeachers(formData); // created news Teacher with datas of formulaire
    teacher.save() // saving new objet in data base
    .then((datas)=> {
        res.status(200);
        res.json({message: "'success': New teacher created"});

        // Send a email message to news Teache, content matricule _id
        console.log(datas);
    })
    .catch(error =>{
        console.log(error);
        res.status(500);
        res.json({message: "'Error': Error Server"});
    });
};

//Register New Student

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