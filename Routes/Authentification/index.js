// Routers for Authentification of users
const router = require("express").Router();
const CtrlStudents = require("../../Controllers/Authentification")

router.post("/Login", CtrlStudents.login);
router.post("/ActiveAccount", CtrlStudents.Activation_account);
router.post("/newTeacher", CtrlStudents.registerNewTeacher);
router.post("/newStudent", CtrlStudents.registerNewStudent);

module.exports = router;