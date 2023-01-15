const db = require(`../../data/db-config`)

function getAll(){
    return db(`dogBreeds`)
}

function getById(id){
    return db(`dogBreeds`)
        .where(`breed_id`, id)
        .first()
}

async function create(breed){
    return await db(`dogBreeds`)
        .insert(breed)
        .then(id => {
            return db(`dogBreeds`).where(`breed_id`, id).first()
        })
}

async function update(id, changes){
    const oldBreed = await getById(id)
    
    await db(`dogBreeds`)
        .update(changes)
        .where(`breed_id`, id)

    const newBreed = await getById(id)
    return ([oldBreed, newBreed])
    }

async function remove(id){
    const breed = await db(`dogBreeds`).where(`breed_id`, id).first()

    await db(`dogBreeds`).delete().where(`breed_id`, id)

    return breed
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
