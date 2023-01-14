exports.up = async function(knex) {
  await knex.schema
    .createTable(`dogBreeds`, table => {
        table.increments(`breed_id`)
        table.string(`breed`)
            .notNullable()
            .unique()
        table.size(`size`)
            .notNullable()
            .checkIn([`large, small, medium`])
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists(`dogBreeds`)
};
