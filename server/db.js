const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'Avenue@77',
  host: 'localhost',
  database: 'DemoData',
  port: 5432
})

module.exports = pool
