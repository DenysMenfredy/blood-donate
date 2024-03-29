require('dotenv').config();

module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": "blood_donate",
        "host": process.env.DB_HOST,
        "dialect": "postgres",
        "logging": false
      },
      "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": "blood_donate",
        "host": process.env.DB_HOST,
        "dialect": "postgres"
      },
      "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": "blood_donate",
        "host": process.env.DB_HOST,
        "dialect": "postgres"
      }
}