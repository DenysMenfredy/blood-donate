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
        as: 'donation'
      });
      DonationToBank.hasOne(models.BloodBank, {
        foreignKey: 'id',
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
    bankId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'DonationToBank',
    tableName: 'donation_to_bank',
    defaultScope: {
      include: ['donation', 'bloodBank']
    }
  });
  return DonationToBank;
};