const mongoose = require("mongoose");

const logs = new mongoose.Schema({
    IP_address: {
        type: String,
        required: [true, "IP Address is Required"],
        unique: true
    },
    hits: {
        type: Number,
        required: [true, "count is Required"]
    }
}, { timestamps: true })

module.exports = mongoose.model('logs', logs)