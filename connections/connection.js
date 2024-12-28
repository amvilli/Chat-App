const { default: mongoose } = require("mongoose");

 async function HandleMongoDBconnection(url){
    return mongoose.connect(url).then( console.log("Connected!")).catch((error)=>{ console.log("Error connecting!")})
 }
 module.exports = { HandleMongoDBconnection}