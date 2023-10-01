// Routers for Authentification of users
const router = require("express").Router();
const CtrlrPay = require("../../Controllers/Pay");
const CtrlrCheckAutorizationUser = require("../../Controllers/Authentification/Autorizations");

router.post("/New", CtrlrCheckAutorizationUser.CheckAutorizationUser, CtrlrPay.NewPaye);

module.exports = router;