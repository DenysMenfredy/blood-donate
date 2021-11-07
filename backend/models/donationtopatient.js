'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DonationToPatient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association 
      DonationToPatient.belongsTo(models.Donation, {
        foreignKey: 'donationId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'donation'
      });
      DonationToPatient.hasOne(models.Patient, {
        foreignKey: 'patientId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'patient'
      });
    }
  };
  DonationToPatient.init({
    patientId: DataTypes.UUID,
    donationId: {
      type:DataTypes.UUID,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'DonationToPatient',
    tableName: 'donation_to_patient',
  });
  return DonationToPatient;
};