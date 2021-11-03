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
      });
    }
  };
  Donation.init({
    donationId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    donationDate: DataTypes.DATE,
    donatorId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'Donation',
    tableName: 'donation',
  });
  return Donation;
};