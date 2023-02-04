const express = require("express")
const { update_state, get_state } = require("../controller/control")
const route = express.Router()

route.get("/get/:btnid", get_state)
route.put("/update", update_state)

module.exports = route