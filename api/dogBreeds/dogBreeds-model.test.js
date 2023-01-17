const Breeds = require(`./dogBreeds-model`)
const db = require(`../../data/db-config`)

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

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

test(`[1] environment is testing`, () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

describe(`getAll`, () => {
    test(`[2] resolves all breeds in dogBreed table`, async () => {
        const breedTable = await Breeds.getAll()

        expect(breedTable).toHaveLength(3)
        expect(breedTable[0]).toMatchObject(collie)
        expect(breedTable[1]).toMatchObject(pom)
        expect(breedTable[2]).toMatchObject(aussie)
    })
})

describe(`getById`, () => {
    test(`[3] resolves breed by given id`, async () => {
        let breed = await Breeds.getById(1)
        expect(breed).toMatchObject(collie)

        breed = await Breeds.getById(2)
        expect(breed).toMatchObject(pom)

        breed = await Breeds.getById(3)
        expect(breed).toMatchObject(aussie)
    })
})

describe(`create`, () => {
    const newBreed = {breed: `golden retriever`, size: `large`}

    test(`[4] resolves to newly created breed`, async () => {
        const result = await Breeds.create(newBreed)

        expect(result).toMatchObject(newBreed)
    })

    test(`[5] resolves new breed to dogBreed table`, async () => {
        await Breeds.create(newBreed)
        const updatedTable = await db(`dogBreeds`)

        expect(updatedTable).toHaveLength(4)
        expect(updatedTable).toEqual(
            expect.arrayContaining([
                expect.objectContaining(newBreed)
            ])
        )
    })
})

describe(`update`, () => {
    const breed1 = {breed: `jack russell terrier`, size: `small`}

    test(`[6] resolves to updated breed`, async () => {
        const oldBreed = await db(`dogBreeds`).where(`breed_id`, 3).first()
        const newBreed = await Breeds.update(3, breed1)

        expect(newBreed).toEqual(
            expect.arrayContaining([
                expect.objectContaining(oldBreed, newBreed)
            ])
        )
    })

    test(`[7] resolves previous breed to updated breed in the dogBreed table`, async () => {
        await Breeds.update(3, breed1)
        const updatedTable2 = await db(`dogBreeds`)

        expect(updatedTable2).toHaveLength(3)
        expect(updatedTable2).toEqual(
            expect.arrayContaining([
                expect.objectContaining(collie, pom, breed1)
            ])
        )
    })
})

describe(`remove`, () => {
    test(`[8] resolves to breed with id deleted`, async () => {
        const breedRemove = await Breeds.remove(3)
        const updatedTable3 = await db(`dogBreeds`)

        expect(updatedTable3).toHaveLength(2)
        expect(updatedTable3).not.toContain(aussie)
        expect(breedRemove).toMatchObject(aussie)
    })
})