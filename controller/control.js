const Control = require("../model/control")

const update_state = async (req, res, next) => {
    try {
        let data = await Control.findOneAndUpdate({ btnid: req.body.btnid }, { state: req.body.state })
        res.send({ "status": "done" })
    } catch (error) {
        req.err = error
        next()
    }
}

const get_state = async (req, res, next) => {
    try {
        let data = await Control.findOne({ btnid: req.params.btnid })
        res.send(data.state)
    } catch (error) {
        req.err = error
        next()
    }
}

module.exports = { update_state, get_state }