// Routers for Authentification of users
const router = require("express").Router();
const CtrlUser = require("../Controllers/users");
const CtrlrCheckAutorizationUser = require("../Controllers/Authentification/Autorizations");

router.get("/", CtrlrCheckAutorizationUser.CheckAutorizationUser, CtrlUser.getAllUsers);
router.get("/Students", CtrlrCheckAutorizationUser.CheckAutorizationUser, CtrlUser.getAllStudents);

module.exports = router;