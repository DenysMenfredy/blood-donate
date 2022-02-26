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
    name: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    phone: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    bloodType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type:DataTypes.STRING,
      allowNull: false
    },
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
  });
  User.sync({force: false, alter: false}).then(() => {
    console.log('Table and model (user) synced successfully');
  }).catch((err) => {
    console.log("Error syncing model and table User", err);
  });
  return User;
};