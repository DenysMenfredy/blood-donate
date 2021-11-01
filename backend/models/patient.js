'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Patient extends Model {

        static associate(models) {
            Patient.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    };
    Patient.init({
        patientId: DataTypes.UUID,
        userId: DataTypes.UUID,
        reason: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Patient',
    });
    return Patient;

};
    
