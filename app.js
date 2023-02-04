const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

const data_route = require("./routes/data")
const control_route = require("./routes/control")

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())

app.use("/note", data_route)
app.use("/control", control_route)

app.use((req, res, next) => {
    if (req.err) {
        console.log(req.err)
        res.status(400).send({ "status": "error something went wrong" })
    }
    else {
        res.status(404).send({ "status": "error 404 page not found" })
    }
})

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to database");
        app.listen(PORT, () => {
            console.log("Server Started")
        })

    })
    .catch((err) => {
        console.log(err)
        throw new Error
    })


