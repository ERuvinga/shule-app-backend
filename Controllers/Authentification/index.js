// Logical Method for Login and registers routers

const modelOfStudents = require("../../Models/Users/Student"); // import model of studes user
//const bcrypt = require("bcrypt");
exports.login = (req, res) => {
    console.log(req.body);
    res.status(200).json({mes:"merci"})
};

exports.register = (req, res) => {
    console.log(req.body);
    res.status(200).json({mes:"merci"})
}