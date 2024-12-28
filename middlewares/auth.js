const { GetUser, SetUser } = require("../services/auth")
function CheckAuthentication(token) {
    return (req, res, next) => {
        const token = req.cookies?.token;
        if (!token) return next()

        try {
            const user = GetUser(token);
            req.user = user;
            next()
        }
        catch (error) {
            console.log("Error ", error)
            next()
        }
    }
}

module.exports = { CheckAuthentication }