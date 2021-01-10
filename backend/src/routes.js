const express = require('express');
const db = require('../db');

const DonatorController = require('./controllers/DonatorController');
const PatientController = require('./controllers/PatientController');
const BloodBankController = require('./controllers/BloodBankController');
const DonationController = require('./controllers/DonationController');
const routes = express.Router();

// client.connect();

routes.get('/', (req, res) => {
    res.send('Hello World');
})

routes.post('/donator', DonatorController.create);
routes.get('/donator', DonatorController.index);
routes.post('/donator/numDonations', DonatorController.numDonations);
routes.post('/donator/getId', DonatorController.getId);
routes.post('/donations/patients', DonatorController.getDonationsToPatients);
routes.post('/donations/banks', DonatorController.getDonationsToBanks);

routes.post('/login', DonatorController.login);

routes.post('/patient', PatientController.create);
routes.post('/patient/all', PatientController.getAll);

routes.post('/banco', BloodBankController.create);
routes.get('/banco/getId', BloodBankController.getId);
routes.get('/banco/all', BloodBankController.getAll);

routes.post('/doacao/banco', DonationController.donateToBank);
routes.post('/doacao/paciente', DonationController.donateToPatient);

routes.get('/test', (req, res) => {
    db.query('SELECT * FROM endereco', [], (err, result) => {
        if(err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
    // await client.end();
});


module.exports = routes;