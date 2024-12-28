
const JWT = require("jsonwebtoken")

const secretKey = "@01PKageNou"
function SetUser(user) {

    playload = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
    }

    return JWT.sign(playload, secretKey)

}

function GetUser(token) {

    return JWT.verify(token, secretKey)
}




module.exports = { GetUser, SetUser }