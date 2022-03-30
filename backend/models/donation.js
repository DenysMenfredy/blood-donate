'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Donation.hasOne(models.Donator, {
        foreignKey: 'donatorId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'donator',
        constraints: false
      });
    }
  };
  Donation.init({
    donationId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    donationDate: {
      type:DataTypes.DATE, 
      allowNull: false
    },
    donatorId: {
      type: DataTypes.UUID, 
      allowNull: false, 
      foreignKey: true
    },
    status: {
      type:DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending'
    }
  }, {
    sequelize,
    modelName: 'Donation',
    tableName: 'donation',
    defaultScope: {
      include: 'donator'
    }
  });
  Donation.sync({force: false, alter: false}).then(() => {
    console.log('Table and model (donation) synced successfully');
  }).catch((err) => {
    console.log("Error syncing model and table Donation", err);
  });
  return Donation;
};