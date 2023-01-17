const db = require(`../../data/db-config`)
const Breeds = require(`./dogBreeds-model`)

//[POST] + [PUT] requests - checks if req.body has size + breed:
const checkPayload = (req, res, next) => {
    const {breed, size} = req.body

    if(!breed && !size){
        res.status(400).json({
            message: `missing dog breed and size`
        })
    }
    else if(!breed || typeof breed !== 'string'){
        res.status(400).json({
            message: `missing dog breed or breed is not a string`})
    }
    else if(!size || typeof size !== `string`){
        res.status(400).json({
            message: `missing dog size or size is not a string`})
    }
    next()
}

//[GET], [PUT], [DEL] requests - checks id is in DB:
const checkId = async (req, res, next) => {
    const idArray = await db(`dogBreeds`).where(`breed_id`, req.params.id)

    if(idArray.length === 0){
       res.status(404).json({ 
        message: `Id ${req.params.id} not found`
        })
    }
    next()
}



module.exports = {
    checkPayload,
    checkId
}