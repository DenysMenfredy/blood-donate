'use strict';

const { Model, BelongsTo } = require('sequelize');


// console.log(db);


module.exports = (sequelize, DataTypes) => {
    class Donator extends Model {

        static associate(models) {
            BelongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    };
    Donator.init({
        donatorId: DataTypes.UUID,
        userId: DataTypes.UUID,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Donator',
    });
    return Donator;

};