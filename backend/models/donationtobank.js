'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DonationToBank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DonationToBank.belongsTo(models.Donation, {
        foreignKey: 'donationId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'donation',
        constraints: false
      });
      DonationToBank.hasOne(models.BloodBank, {
        foreignKey: 'blood_bank_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'bloodBank'
      });
    }
  };
  DonationToBank.init({
    donationId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    bankId: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true,
    },
  }, {
    sequelize,
    modelName: 'DonationToBank',
    tableName: 'donation_to_bank',
    defaultScope: {
      include: ['donation', 'bloodBank']
    }
  });
  DonationToBank.sync({force: false, alter: false}).then(() => {
    console.log('Table and model synced successfully');
  }).catch((err) => {
    console.log("Error syncing model and table Donation to Bank", err);
  });
  return DonationToBank;
};