// Routers for Authentification of ussers
const router = require("express").Router();
const CtrlStudents = require("../../Controllers/Authentification")

router.use("/Login", CtrlStudents.login);
router.use("/Register", CtrlStudents.register);

module.exports = router;