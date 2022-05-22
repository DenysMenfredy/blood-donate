const db = require('../../models');


module.exports = {

    async donateToBank(request, response) {
        const {donatorId, bankId, date} = request.body;
        
        const donator = await db.Donator.findOne({
            where:{
                donatorId: donatorId
            }
        })

        if(!donator) {
            return response.status(400).json({error: 'Donator not found'});
        }

        const bloodBank = await db.BloodBank.findOne({
            where:{
                blood_bank_id: bankId
            }
        });

        if(!bloodBank) {
            return response.status(400).json({error: 'Blood bank not found'});
        }

        const donation = db.Donation.create({
            donatorId,
            donationDate: date,
        }).then((donation) => {
            const donationToBank = db.DonationToBank.create({
                donationId: donation.donationId,
                bankId,
            }).then((donationToBank) => {
                return response.status(201).json({
                    status: 'success',
                    message: 'Donation created successfully',
                    donationToBank: donationToBank
                });
            }).catch((err) => {
                console.log(err);
                return response.status(500).json({error: "Error creating donation to bank"});
            })
        }).catch((err) => {
            return response.status(400).json({
                message: 'Donation not created'
            });
        });

        
    },

    async donationsToBanks(request, response) {
        const donations = await db.DonationToBank.findAll({
            include: [{
                model: db.Donation,
                as: 'donation',
                attributes: ['donationId', 'donationDate', 'status'],
            }]
        });
        if(!donations) {
            return response.status(400).json({
                message: 'Donations not found'
            });
        }
        return response.status(200).json({status:"sucess",
                                          message:"Donations retrieved with sucess",
                                          donations});
    },

    async donateToPatient(request, response) {
        const {donatorId, patientId, date} = request.body;
        if (!date) {
            return response.status(400).json({error: 'Date is required'});
        }
        console.log(donatorId, patientId, date);
        
        const donator = await db.Donator.findOne({
            where:{
                donatorId: donatorId
            }
        })

        if(!donator) {
            return response.send({
                code: 404,
                message: 'Donator not found',
                sucess: false
            });
        }

        const patient = await db.Patient.findOne({
            where:{
                patientId: patientId
            }
        });

        if(!patient) {
            return response.send({
                code: 404,
                message: 'Patient not found',
                sucess: false
            });
        }

        const donation = db.Donation.create({
            donatorId,
            donationDate: date,
        }).then((donation) => {
            const donationToPatient = db.DonationToPatient.create({
                donationId: donation.donationId,
                patientId,
            }).then((donationToPatient) => {
                return response.status(201).json({
                    code: 201,
                    status: 'success',
                    message: 'Donation created successfully',
                    donationToPatient: donationToPatient
                });
            }).catch((err) => {
                console.log(err);
                return response.send({
                    code: 500,
                    status: 'error',
                    message: 'Error creating donation to patient'
                })
            })
        })
        
    },

    async donationsToPatients(request, response) {
        const {donatorId} = request.body;
        console.log(donatorId);
        const query = `SELECT * FROM "user" WHERE "userId" IN
                        (SELECT "userId" FROM patient WHERE "patientId" IN
                        (SELECT "patientId" FROM donation INNER JOIN donation_to_patient 
                        ON donation."donationId" = donation_to_patient."donationId" 
                        WHERE donation."donatorId" = '${donatorId}'))`;

        const donations = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
        if(!donations) {
            return response.send({
                code: 404,
                message:"No donations found for this donator"});
        }
        return response.send({
            code: 200,
            donations
        });
                            

    }
}