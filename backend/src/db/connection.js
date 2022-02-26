const Sequelize = require('sequelize');

const sequelize = new Sequelize('blood_donate', 'postgres', '1499', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    logging: false,
    pool: {
        max: 5,
    },
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.log('Unable to connect to the database:', err);
});

console.log("Another task.");

module.exports = sequelize;