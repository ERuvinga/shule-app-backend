// Routers for Proclammation of users
const router = require("express").Router();
const CtrlrProclammation = require("../Controllers/Proclammation")
const CtrlrCheckAutorizationUser = require("../Controllers/Authentification/Autorizations");

router.get("/", CtrlrCheckAutorizationUser.CheckAutorizationUser, CtrlrProclammation.getAllDatesProclammation);
router.post("/update", CtrlrCheckAutorizationUser.CheckAutorizationUser, CtrlrProclammation.UpdateDateProclammation);

module.exports = router;