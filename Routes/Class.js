// Routers for Authentification of users
const router = require("express").Router();
const CtrlClass = require("../Controllers/Class");
const CtrlrCheckAutorizationUser = require("../Controllers/Authentification/Autorizations");

router.get("/", CtrlrCheckAutorizationUser.CheckAutorizationUser, CtrlClass.getUserOfClass, CtrlClass.getCoursesOfClass);
router.get("/Cotes", CtrlrCheckAutorizationUser.CheckAutorizationUser,CtrlClass.getCotesOfStudent);
router.post("/newsCotes", CtrlrCheckAutorizationUser.CheckAutorizationUser, CtrlClass.SavingCote);

module.exports = router;