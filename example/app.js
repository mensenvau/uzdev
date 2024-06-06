/* read .env */
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })

const express = require('express')
const app = express()
const cors = require('cors')
const controller = require('./controllers/error.controllers')

app.use(cors({ origin: process.env.CORS_ORIGIN.split(","), optionsSuccessStatus: 200 }))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use("/api", require("./routes/main.routes"))

app.use(controller.error)
app.use(controller.missed)

app.listen(process.env.PORT, () => {
    console.log(`Status: active: \n\n - http://localhost:${process.env.PORT}\n - https://<sub_domain>.<your_domain>`)
})
