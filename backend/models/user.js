'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    
  };
  User.init({
    userId:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    bloodType: DataTypes.STRING,
    sex: DataTypes.STRING,
    email: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
  });
  // User.sync({
  //   alter: true,
  //   force: true
  // })
  return User;
};