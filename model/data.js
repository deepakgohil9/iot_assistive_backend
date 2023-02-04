const mongoose = require("mongoose")

const data_schema = mongoose.Schema({
    flame: Number,
    gas: Number,
    humidity: Number,
    light: Number,
    temperature: Number
}, { timestamps: true })

module.exports = mongoose.model("data", data_schema)