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
        constraints: false,
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
    patientId: {
      type: DataTypes.UUID, 
      allowNull: false, 
      foreignKey: true
    },
    donationId: {
      type:DataTypes.UUID,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'DonationToPatient',
    tableName: 'donation_to_patient',
    defaultScope: {
      include: ['donation', 'patient']
    }
  });
  DonationToPatient.sync({force: true, alter: true}).then(() => {
    console.log('Table and model synced successfully');
  }).catch((err) => {
    console.log("Error syncing model and table Donation to Patient", err);
  });
  return DonationToPatient;
};