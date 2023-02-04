const express = require("express")
const { add_note } = require("../controller/data")

const route = express.Router()

route.post("/add", add_note)

module.exports = route