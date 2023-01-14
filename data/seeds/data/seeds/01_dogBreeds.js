exports.seed = async function(knex) {
  await knex('dogBreeds').insert([
    {
      breed_id: 1,
      breed: `collie`,
      size: `large`
    },
    {
      breed_id: 2,
      breed: `pomeranian`,
      size: `small`
    },
    {
      breed_id: 3,
      breed: `mini australian shepherd`,
      size: `medium`
    },
  ])
};
