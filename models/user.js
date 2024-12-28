const express = require('express');
const { createHmac, randomBytes, createHash } = require("crypto")
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    profileImage: {
        type: String,
        default: "/public/images/man.png"
    }
    ,
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        unique: true
    }
}, { timestamps: true})

userSchema.pre("save", function (next) {

    const user = this
    const salt = randomBytes(16).toString();
    const hashedpasswd = createHmac("sha256", salt).update(user.password).digest("hex")
    user.salt = salt;
    user.password = hashedpasswd;
    next()
})

userSchema.static("MatchPasswd", async function MatchPasswd (email, password) {

    const user = await User.findOne({email})
    if (!user) throw new Error;
    const salt = user.salt;
    const hashedpasswd = createHmac("sha256", salt).update(password).digest("hex")
    const proivedpasswd = user.password;
   
    const updatedUserDetial = {
         _id : user._id ,
         fullname : user.fullname,
         email : user.email , 
         profileImage : user.profileImage,
         password : undefined ,
         salt : undefined , 

    }
    if (hashedpasswd !== proivedpasswd) throw new Error  

    return updatedUserDetial; 

})




const User = mongoose.model("user", userSchema)


module.exports = User;
