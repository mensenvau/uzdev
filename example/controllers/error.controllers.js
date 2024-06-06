const { botSender } = require("uzdev/sender")

let error = (err, req, res, next) => {
    // botSender(err?.message)
    res.status(403).json({ message: "unexpected error!", details: JSON.parse(err?.message) })
}

let missed = (req, res, next) => {
    res.status(404).json({ message: "there is no such router!" })
}

module.exports = { error, missed }