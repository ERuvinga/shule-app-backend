// Routers for Authentification of users
const router = require("express").Router();
const CtrlStudents = require("../../Controllers/Authentification")

router.post("/Login", CtrlStudents.login);
router.post("/ActiveAccount", CtrlStudents.Activation_account);
//router.post("/ActiveAccount", CtrlStudents.registerNewDirector);

module.exports = router;