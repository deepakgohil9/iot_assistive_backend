const Note = require("../model/data")
const fetch = require("node-fetch")

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

const get_data = async (req, res, next) => {
    try {
        let data = await Note.find().limit(10).sort({ createdAt: -1 })
        let temp = []
        let hum = []

        data.forEach(element => {
            temp.push({ value: element.temperature, label: element.createdAt })
            hum.push({ value: element.humidity, label: element.createdAt })
        })

        let temp_url = await fetch('https://api.apyhub.com/generate/charts/bar/url?output=sample.png', {
            method: 'POST',
            headers: {
                'apy-token': process.env.APY_TOKEN,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': 'Temperature Bar Chart',
                'theme': 'Dark',
                'data': temp
            })
        })
        temp_url = await temp_url.json()


        let hum_url = await fetch('https://api.apyhub.com/generate/charts/bar/url?output=sample.png', {
            method: 'POST',
            headers: {
                'apy-token': process.env.APY_TOKEN,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': 'Humidity Bar Chart',
                'theme': 'Dark',
                'data': hum
            })
        })
        hum_url = await hum_url.json()


        let length = data.length
        res.send({
            temp_url: temp_url,
            hum_url: hum_url,
            temp: data[0].temperature,
            hum: data[0].humidity,
            flame: data[0].flame,
            gas: data[0].gas,
            light: data[0].light,
            data:data
        })

    } catch (error) {
        req.err = error
        next()
    }
}

module.exports = { add_note, get_data }