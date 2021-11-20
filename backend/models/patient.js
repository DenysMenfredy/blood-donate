'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Patient extends Model {

        static associate(models) {
            Patient.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                as: 'user'
            });
        }
    };
    Patient.init({
        patientId:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        userId: DataTypes.UUID,
        reason: DataTypes.TEXT,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Patient',
        tableName: 'patient',
        // defaultScope: {
        //     include: 'user'
        // }
    });
    // Patient.sync({
    //     force: false,
    //     alter: true,
    // });
    return Patient;

};
    
