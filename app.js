const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

const data_route = require("./routes/data")

dotenv.config()

const PORT = process.env.PORT || 3000
const connect = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            console.log(err)
            throw new Error
        })
}
const app = express()

app.use(cors())
app.use(express.json())

app.use("/note", data_route)

app.use((req, res, next) => {
    if (req.err) {
        res.status(400).send({ "status": "error something went wrong" })
    }
    else {
        res.status(404).send({ "status": "error 404 page not found" })
    }
})

app.listen(PORT, () => {
    connect()
    console.log("Server Started")
})
