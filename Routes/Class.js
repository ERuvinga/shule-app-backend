// Routers for Authentification of users
const router = require("express").Router();
const CtrlClass = require("../Controllers/Class");
const CtrlrCheckAutorizationUser = require("../Controllers/Authentification/Autorizations");

router.get("/", CtrlrCheckAutorizationUser.CheckAutorizationUser, CtrlClass.getUserOfClass, CtrlClass.getCoursesOfClass);

module.exports = router;