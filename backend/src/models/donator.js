const { Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const {sequelize: db} = require('../db/connection');

// console.log(db);

const Donator = db.define('donator', {
    id: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4()
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birthDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    bloodType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sex: {
        type: Sequelize.STRING,
        // allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    }

}, {

});

module.exports = {Donator};