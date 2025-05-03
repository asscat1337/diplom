const pg = require('pg');

const pool = new pg.Pool({
  port: process.env.PG_PORT || 5432,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  max: 10,
  host: "localhost",
  user: process.env.PG_USER
});

async function databaseConnect(){
    return pool.connect()
}

async function closeDatabaseConnection(){
  await pool.end()
}

module.exports = {pool,databaseConnect}