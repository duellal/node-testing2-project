const express = require('express')
const server = express()
const breedRouter = require(`./dogBreeds/dogBreeds-router`)

server.use(express.json())
server.use(`/api/breeds`, breedRouter)

server.get(`/`, (req, res) => {
    res.status(200).json({message: `API is up and running!`})
})

module.exports = server