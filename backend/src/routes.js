const express = require('express');
const pool = require('./db_connection');

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
routes.get('donator/numDonations', DonatorController.numDonations);
routes.get('/donations/patients', DonatorController.getDonationsToPatients);
routes.get('/donations/banks', DonatorController.getDonationsToBanks);

routes.post('/login', DonatorController.login);

routes.post('/patient', PatientController.create);
routes.get('/patient/all', PatientController.getAll);

routes.post('/banco', BloodBankController.create);
routes.get('/banco/getId', BloodBankController.getId);

routes.post('/doacao/banco', DonationController.donateToBank);
routes.post('/doacao/paciente', DonationController.donateToPatient);

routes.get('/test', (req, res) => {
    pool.query('SELECT * FROM endereco', (err, result) => {
        if(err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
    // await client.end();
});


module.exports = routes;