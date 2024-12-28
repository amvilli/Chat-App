const user = require("../models/user")

async function HandleHomeGetReq (req,res){

    const alluser = await user.find({})

    res.render("home" , {users:alluser})
}
module.exports =  { HandleHomeGetReq}