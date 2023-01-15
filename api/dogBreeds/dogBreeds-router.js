const express = require(`express`)
const router = express.Router()
const Breeds = require(`./dogBreeds-model`)

router.get(`/`, (req, res) => {
    Breeds.getAll()
        .then(breeds => {
            res.status(200).json(breeds)
        })
        .catch(err => {
            console.log(`Error in dogBreeds router`, err)
            res.status(400).json({message: `Something went wrong, please try again.`})
        })
})

router.get(`/:id`, (req, res) => {
    const id = req.params.id
    Breeds.getById(id)
        .then(breed => {
            res.status(200).json(breed)
        })
        .catch(err => {
            console.log(`Error in dogBreeds router [GET] /:id`, err)
            res.status(400).json({message: `Id ${id} does not exist.`})
        })
})

router.post(`/`, async (req, res) => {
    Breeds.create(req.body)
        .then(newBreed => {
            res.status(201).json(newBreed)
        })
        .catch(err => {
            console.log(`Error occurred in dogBreeds router [POST]`, err)
            res.status(400).json({message: `missing dog size or breed`})
        })
})

router.put(`/:id`, (req, res) => {
    Breeds.update(req.body)
        .then(updatedBreed => {
            res.status(200).json(updatedBreed)
        })
        .catch(err => {
            console.log(`Error occurred in dogBreeds router [PUT]`, err)
            res.status(400).json({message: `missing dog size or breed`})
        })
})

router.delete(`/:id`, (req, res) => {
    res.end()
})

module.exports = router