// Routers for Authentification of users
const router = require("express").Router();
const CtrlNews = require("../Controllers/News");
const CtrlrCheckAutorizationUser = require("../Controllers/Authentification/Autorizations");

router.get("/", CtrlNews.getAllPub);
router.post("/Adding", CtrlrCheckAutorizationUser.CheckAutorizationUser, CtrlNews.NewsPub);

module.exports = router;