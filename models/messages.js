const express = require('express');
const mongoose = require("mongoose");

const userMsg = new mongoose.Schema({

    body: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        ref: "user"
    },
    createdFor: {
        type: String,
        ref: "user"
    }


}, { timestamps: true })

const Msg = mongoose.model("userMsg", userMsg)

module.exports = Msg
