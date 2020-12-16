const {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "4321",
    host: "localhost",
    port: 5432,
    database: "blood-donate"
});



// const connectionString = 'postgres://postgres:4321@localhost:5432/blood-donate';

// const client = new Client({
    // connectionString: connectionString
// });

// client.connect();

module.exports = pool;