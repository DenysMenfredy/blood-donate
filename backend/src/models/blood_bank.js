const {Sequelize} = require('sequelize');
import {v4 as uuidv4} from 'uuid';
import {sequelize} from '../db/connection';

const BloodBank = sequelize.define('blood_bank', {
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
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    uf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    }

}, {

});

export {BloodBank};