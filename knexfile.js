const repeated = {
  client: 'sqlite3',
  useNullAsDefault: true, 
  migrations: {directory: `./data/migrations`},
  seeds: {directory: `./data/seeds`}
}
module.exports = {
  development: {
    ...repeated,
    connection: {
      filename: `./data/dogBreeds.db3`
    }
  },
  testing: {
    ...repeated,
    connection: `./data/testBreeds.db3`
  }
};
