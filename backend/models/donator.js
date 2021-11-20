'use strict';

const { Model} = require('sequelize');


// console.log(db);


module.exports = (sequelize, DataTypes) => {
    class Donator extends Model {

        static associate(models) {
            Donator.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                as: 'user'
            });
        }
    };
    Donator.init({
        donatorId: {
            type:DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        userId: DataTypes.UUID,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Donator',
        tableName: 'donator',
        // defaultScope: {
        //     include: 'user'
        // },
    });
    // Donator.sync({
    //     force: false,
    //     alter: true,
    // });
    return Donator;

};