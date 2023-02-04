const Note = require("../model/data")

const add_note = async (req, res, next) => {
    try {
        console.log(req.body)
        let my_note = Note(req.body)
        await my_note.save()
        res.send({ "status": "done" })
    } catch (error) {
        req.err = error
        next()
    }
}

module.exports = { add_note }