'use strict';

const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class BloodBank extends Model {

        static associate(models) {
            // define association here
        }
    };
    BloodBank.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        phone: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'BloodBank',
        tableName: 'blood_bank',
    });
    // BloodBank.sync({
    //     force: false,
    //     alter: true
    // })
    return BloodBank;
};