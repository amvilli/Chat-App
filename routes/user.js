const express = require('express');
const router = express.Router();
const { HandleUserGetReq, HandleUserPostReq , HandleUserLoginGetReq ,HandleUserLoginPostReq, HandleUserChatViewGetReq  , HandleUserChatViewPostReq} = require("../controllers/user")

router.route("/").get(HandleUserGetReq).post(HandleUserPostReq)
router.route("/login").get(HandleUserLoginGetReq).post(HandleUserLoginPostReq)
router.route("/chats/:id").get(HandleUserChatViewGetReq).post(HandleUserChatViewPostReq)


module.exports = router
