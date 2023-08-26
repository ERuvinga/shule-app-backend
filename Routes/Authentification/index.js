// Routers for Authentification of ussers
const router = require("express").Router();
const CtrlStudents = require("../../Controllers/Authentification")

router.post("/Login", CtrlStudents.login);
router.post("/Register", CtrlStudents.register);

module.exports = router;