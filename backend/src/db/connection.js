
require('dotenv/config');

const {Pool} = require('pg');

const connectionInfo = {
    user: process.env.DB_USER,
    password: parseInt(process.env.DB_PASSWORD),
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB,
}


const pool = new Pool(connectionInfo);

pool.on('connected', () => console.log("Connected"));
pool.on('error', (err) => console.log(err));

module.exports ={
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}
    