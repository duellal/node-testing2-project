exports.up = async function(knex) {
  await knex.schema
    .createTable(`dogBreeds`, table => {
        table.increments(`breed_id`)
        table.string(`breed`)
            .notNullable()
            .unique()
        table.string(`size`)
            .notNullable()
        //want to make only 3 sizes that can be added to the table
            // .checkIn([`large, small, medium`])            
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists(`dogBreeds`)
};
