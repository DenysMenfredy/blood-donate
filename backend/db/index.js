const {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "4321",
    host: "localhost",
    port: 5432,
    database: "blood-donate"
});



module.exports ={
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}
    