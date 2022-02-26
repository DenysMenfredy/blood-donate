'use strict';

const { Model } = require('sequelize');


// console.log(db);


module.exports = (sequelize, DataTypes) => {
    class Donator extends Model {

        static associate(models) {
            Donator.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                as: 'user',
                constraints: false
            });
            // Donator.hasMany(models.Donation, {
            //     foreignKey: 'donatorId',
            //     onDelete: 'CASCADE',
            //     onUpdate: 'CASCADE',
            //     as: 'donation',
            //     constraints: false
            // })
        }
    };
    Donator.init({
        donatorId: {
            type:DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            foreignKey: true,
        },
        username: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Donator',
        tableName: 'donator',
        defaultScope: {
            include: 'user'
        },
    });
    Donator.sync({force: false, alter: false}).then(() => {
        console.log('Table and model (donator) synced successfully');
      }).catch((err) => {
        console.log("Error syncing model and table Donator", err);
      });
    return Donator;

};