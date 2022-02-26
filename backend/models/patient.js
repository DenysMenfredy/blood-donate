'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Patient extends Model {

        static associate(models) {
            Patient.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                as: 'user',
                constraints: false
            });
        }
    };
    Patient.init({
        patientId:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        userId: {
            type:DataTypes.UUID,
            allowNull: false,
            foreignKey: true,

        },
        reason: DataTypes.TEXT,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Patient',
        tableName: 'patient',
        defaultScope: {
            include: 'user'
        }
    });
    Patient.sync({force: false, alter: false}).then(() => {
        console.log('Table and model (user) synced successfully');
      }).catch((err) => {
        console.log("Error syncing model and table Patient", err);
      });
    return Patient;

};
    
