const express = require("express")
const { add_note, get_data } = require("../controller/data")

const route = express.Router()

route.post("/add", add_note)
route.get("/get", get_data)

module.exports = route