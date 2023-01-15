const db = require(`../data/db-config`)
const request = require(`supertest`)
const server = require(`./server`)

const collie = {
    breed_id: 1,
    breed: `collie`,
    size: `large`
  }
  const pom = {
    breed_id: 2,
    breed: `pomeranian`,
    size: `small`
  }
const aussie = {
    breed_id: 3,
    breed: `mini australian shepherd`,
    size: `medium`
  }
const newBreed = {
  breed: `great dane`, 
  size: `large`
}
const missingSize = {breed: `labrador retriever`}
const missingBreed = {size: `medium`}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

test(`Server working`, async () => {
    const res = await request(server).get(`/`)

    expect(res.body).toMatchObject({message: `API is up and running!`})
    expect(res.status).toBe(200)
})

describe(`[GET] /api/breeds`, () => {
    test(`responds with array of all dog breeds`, async () => {
        const dogBreeds = await request(server).get(`/api/breeds`)

        expect(dogBreeds.body).toHaveLength(3)
        expect(dogBreeds.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining(collie, pom, aussie)
          ])
        )
    })

    test(`responds with 200 OK`, async () => {
      const dogBreeds = await request(server).get(`/api/breeds`)

      expect(dogBreeds.status).toBe(200)
    })
})

describe(`[GET] /api/breeds/:id`, () => {
  test(`responds with correect dog with id specified`, async () => {
    let res = await request(server).get(`/api/breeds/1`)
    expect(res.body).toMatchObject(collie)
    expect(res.status).toBe(200)

    res = await request(server).get(`/api/breeds/2`)
    expect(res.body).toMatchObject(pom)
    expect(res.status).toBe(200)

    res = await request(server).get(`/api/breeds/3`)
    expect(res.body).toMatchObject(aussie)
    expect(res.status).toBe(200)
  })

  test(`responds with error if id does not exist`, async () => {
    const res = await request(server).get(`/api/breeds/100`)
 
    expect(res.body).toMatchObject({message: `Id 100 not found`})
    expect(res.status).toBe(404)
  })
})

describe(`[POST] /api/breeds`, () => {
  test(`responds with new breed`, async () => {
    const res = await request(server).post(`/api/breeds`).send(newBreed)

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject(newBreed)
  })

  test(`adds breed to db`, async () => {
    await request(server).post(`/api/breeds`).send(newBreed)
    const newDb = await db('dogBreeds')

    expect(newDb).toHaveLength(4)
    expect(newDb).toEqual(
        expect.arrayContaining([
        expect.objectContaining(newBreed)
      ])
    )
  })

  test(`throws error if size or breed is missing`, async () => {
    let res = await request(server).post(`/api/breeds`).send(missingBreed)
    expect(res.status).toBe(400)
    expect(res.body).toMatchObject({message: `missing dog breed or breed is not a string`})

    res = await request(server).post(`/api/breeds`).send(missingSize)
    expect(res.status).toBe(400)
    expect(res.body).toMatchObject({message: `missing dog size or size is not a string`})
  })
})

describe(`[PUT] /api/breeds/:id`, () => {
  test(`updates breed with id in db`, async () => {
    const res = await request(server).put(`/api/breeds/1`).send(newBreed)
    const updatedDb = await db(`dogBreeds`)

    expect(res.status).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(newBreed)
      ])
    )
    expect(updatedDb).toHaveLength(3)
    expect(updatedDb).toEqual(
      expect.arrayContaining([
        expect.objectContaining(newBreed)
      ])
    )
  })
})

describe(`[DEL] /api/breeds/:id`, () => {
  test(`resolves to deleted breed`, async () => {
    const res = await request(server).del(`/api/breeds/2`)

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject(pom)
  })

  test(`db does not have deleted breed`, async () => {
    await request(server).del(`/api/breeds/2`)
    const updatedDb2 = await db(`dogBreeds`)

    expect(updatedDb2).toHaveLength(2)
    expect(updatedDb2).not.toContain(pom)
  })

  test(`throws error if id does not exist`, async () => {
    const res = await request(server).del(`/api/breeds/100`)

    expect(res.status).toBe(404)
    expect(res.body).toMatchObject({message: `Id 100 not found`})
  })
})