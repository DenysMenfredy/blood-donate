'use strict';

const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class BloodBank extends Model {

        static associate(models) {
            // define association here
        }
    };
    BloodBank.init({
        id: DataTypes.UUID,
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        phone: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'BloodBank',
    });
    
    return BloodBank;
};