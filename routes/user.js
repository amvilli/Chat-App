const express = require('express');
const router = express.Router();
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, (__dirname, "./public/uploads"))
    },
    filename: function (req, file, cb) {

        const filename = file.originalname
        return cb(null, `${Date.now()}${filename}`)
    }

})

const upload = multer({ storage: storage })

const { HandleUserGetReq, HandleUserPostReq, HandleUserLoginGetReq, HandleUserLoginPostReq, HandleUserChatViewGetReq, HandleUserChatViewPostReq } = require("../controllers/user")

router.route("/").get(HandleUserGetReq)
router.post("/", upload.single("userImg"), HandleUserPostReq)
router.route("/login").get(HandleUserLoginGetReq).post(HandleUserLoginPostReq)
router.route("/chats/:id").get(HandleUserChatViewGetReq).post(HandleUserChatViewPostReq)


module.exports = router
