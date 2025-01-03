
const User = require("../models/user")
const { SetUser } = require("../services/auth")
const io = require("../index")
const Msg = require("../models/messages")
async function HandleUserGetReq(req, res) {
    res.render("signup")


}
async function HandleUserPostReq(req, res) {
    const { fullname, email, password } = req.body
    console.log("req.file --> ", req.file)

    try {
        const createdUser = await User.create({
            fullname,
            email,
            password,
            profileImage: `/${req.file.filename}`
        })
        const alluser = await User.find({})


        // res.render("home", { user: createdUser, users: alluser })
        res.redirect('/user/login');
    } catch (error) {
        res.render("signup", { error: "error creating user " })
        if (error.code === 11000) {
            res.render("signup", { error: "Its your second time using this Email " })
        }
    }
}

async function HandleUserLoginGetReq(req, res) {

    res.render("login")

}

async function HandleUserLoginPostReq(req, res) {

    const { email, password } = req.body;
   try{
    const respones = await User.MatchPasswd(email, password)

    const token = await SetUser(respones);
    res.cookie("token", token, {
        httpOnly: true,   // Prevents client-side access
        secure: true,     // HTTPS only
    });
    const alluser = await User.find({})
    res.render("home", { user: respones, users: alluser });
   }catch(error){
    console.log("Error hahah ", error)
    res.render("home")
   }
    
}

async function HandleUserChatViewGetReq(req, res) {

    if(!req.user ) return res.redirect("/user/login")
    const io = req.app.get('io');
    const user = await User.findOne({ _id: req.params.id })

    io.on("connection", (socket) => {
        socket.on("userDetails", async (msg, userId) => {
            const FirstUser = await User.findOne({ _id: userId })
            const secondUser = await User.findOne({email : req.user.email})
            console.log("This is user 1 -->", FirstUser);
            console.log("This is user 2 -->", secondUser);
            const createdMsg = await Msg.create({
                body: msg,
                createdBy:  secondUser._id,
                createdFor: FirstUser._id
            })

            io.emit("message", createdMsg)
        })


        socket.on("disconet", () => {
            console.log("Our idiot has gone!")

        })
    })

    res.render("chatview", { user: user })
}
async function HandleUserChatViewPostReq(req, res) {

}

module.exports = { HandleUserGetReq, HandleUserPostReq, HandleUserLoginGetReq, HandleUserChatViewPostReq, HandleUserLoginPostReq, HandleUserChatViewGetReq }