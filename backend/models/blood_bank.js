'use strict';

const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class BloodBank extends Model {

        static associate(models) {
            // define association here
        }
    };
    BloodBank.init({
        blood_bank_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type:DataTypes.STRING, 
            allowNull: false
        },
        address: {
            type:DataTypes.STRING, 
            allowNull: false
        },
        city: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING, 
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'BloodBank',
        tableName: 'blood_bank',
    });
    // BloodBank.removeAttribute('id');
    BloodBank.sync({force: false, alter: false}).then(() => {
        console.log('Table and model synced successfully');
      }).catch((err) => {
        console.log("Error syncing model and table Blood Bank", err);
      });
    return BloodBank;
};