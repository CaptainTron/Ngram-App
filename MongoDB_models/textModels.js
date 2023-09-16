const mongoose = require("mongoose");

const Texts = new mongoose.Schema({
    IP_address: {
        type: String,
        required: [true, "IP Address is Required"],
    },
    text: {
        type: String,
        required: [true, "Text is Required"]
    }
}, { timestamps: true })


module.exports = mongoose.model('texts', Texts)