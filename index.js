const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const userRoute = require("./routes/user")
const homeRoute = require("./routes/home")
const { HandleMongoDBconnection } = require("./connections/connection")
const { createServer } = require('node:http');
const { Server } = require('socket.io')
const { CheckAuthentication } = require("./middlewares/auth")
const cookieParser = require("cookie-parser")

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
  });

// Middlewares .. 
HandleMongoDBconnection("mongodb://127.0.0.1:27017/ChatApp")
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(CheckAuthentication("token"))
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.static(path.resolve("./public/images")))
app.use(express.static(path.resolve("./public/uploads")))
app.set('io', io);

app.use("/", homeRoute)
app.use("/user", userRoute)

server.listen(8000, () => {
    console.log(`Server started on port`);
});

module.exports = io 