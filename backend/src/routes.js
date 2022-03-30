const express = require('express');
const db = require('./db/connection');
// const verifyJWT = require("./utils/verificaJWT");
const DonatorController = require('./controllers/DonatorController');
const PatientController = require('./controllers/PatientController');
const BloodBankController = require('./controllers/BloodBankController');
const DonationController = require('./controllers/DonationController');
const UserController = require('./controllers/UserController');
const { Router } = require('express');
const routes = express.Router();

// TODO: Implement routes in controllers and use them here

routes.get('/', (req, res) => {
    res.send({'message':'Hello World'});
})

routes.post('/donator', DonatorController.create);
routes.get('/donator/d/:donatorId', DonatorController.index);
routes.post('/donator/getId', DonatorController.getId);
routes.get('/donator', DonatorController.getAll);
routes.post('/donator/numDonations', DonatorController.numDonations);

routes.get('/user/getBloodType', UserController.getBloodType);
// routes.post('/donations/patients', DonatorController.getDonationsToPatients);
// routes.post('/donations/banks', DonatorController.getDonationsToBanks);

routes.post('/login', DonatorController.login);
routes.post('/validate', DonatorController.validate);

routes.post('/patient', PatientController.create);
routes.get('/patient', PatientController.getAll);
routes.get('/patient/:patientId', PatientController.index);


routes.post('/bank', BloodBankController.create);
routes.get('/bank/:name', BloodBankController.getId);
routes.get('/bank', BloodBankController.getAll);

routes.post('/donation/bank', DonationController.donateToBank);
routes.get('/donation/bank', DonationController.donationsToBanks);
routes.post('/donation/patient', DonationController.donateToPatient);
routes.get('/donation/patient', DonationController.donationsToPatients);



module.exports = routes;