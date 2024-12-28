const express = require('express');
const router  = express.Router();
const { HandleHomeGetReq} = require("../controllers/home");
const { modelName } = require('../models/user');

router.get("/", HandleHomeGetReq)

module.exports = router
