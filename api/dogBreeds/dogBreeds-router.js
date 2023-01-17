const express = require(`express`)
const router = express.Router()
const Breeds = require(`./dogBreeds-model`)
const {checkPayload, checkId} = require(`./dogBreeds-middleware`)

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

router.get(`/:id`, checkId, (req, res) => {
    const id = req.params.id
    Breeds.getById(id)
        .then(breed => {
            res.status(200).json(breed)
        })
        .catch((err) => {
            console.log(`Error in dogBreeds router [GET] /:id`, err)
        })
})

router.post(`/`, checkPayload, async (req, res) => {
    Breeds.create(req.body)
        .then(newBreed => {
            res.status(201).json(newBreed)
        })
        .catch(err => {
            console.log(`Error occurred in dogBreeds router [POST]`, err)
        })
})

router.put(`/:id`, checkId, (req, res) => {
    Breeds.update(req.params.id, req.body)
        .then(updatedBreed => {
            res.status(200).json(updatedBreed)
        })
        .catch(err => {
            console.log(`Error occurred in dogBreeds router [PUT]`, err)
        })
})

router.delete(`/:id`, checkId, (req, res) => {
    Breeds.remove(req.params.id)
        .then(breed => {
            res.status(200).json(breed)
        })
        .catch(err => {
            console.log(`Error occurred in dogBreeds router [DEL]`, err)
        })
})

module.exports = router