const mongoose = require("mongoose")

const control_schema = mongoose.Schema({ btnid: Number, state: Boolean }, { timestamps: true })

module.exports = mongoose.model("control", control_schema)