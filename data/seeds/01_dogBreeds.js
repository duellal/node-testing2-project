exports.seed = async function(knex) {
  await knex(`dogBreeds`).truncate()
  await knex('dogBreeds').insert([
    {
      breed: `collie`,
      size: `large`
    },
    {
      breed: `pomeranian`,
      size: `small`
    },
    {
      breed: `mini australian shepherd`,
      size: `medium`
    },
  ])
};