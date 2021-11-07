const db = require('../../models');


module.exports = {

    async donateToBank(request, response) {
        const {donatorId, bankId, date} = request.body;
        
        const donation = await db.Donation.create({
            donatorId,
            donationDate: date,
        });

        if(!donation) {
            return response.status(400).json({
                message: 'Donation not created'
            });
        }
        const donationToBank = await db.DonationToBank.create({
            donationId: donation.donationId,
            bankId,
        });

        if(!donationToBank) {
            return response.status(400).json({
                message: 'Donation to Bank not created'
            });
        }

        return response.status(201).json({status:"sucess",
                                          message:"Donation to bank scheduled with sucess",
                                          donation: donationToBank});
        
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
        // console.log(donatorId, patientId, data);

        const donation = await db.Donation.create({
            donatorId,
            donationDate: date,
        });
        if(!donation) {
            return response.status(400).json({message: 'Donation not created'});
        }
        const donationToPatient = await db.DonationToPatient.create({
            donationId: donation.donationId,
            patientId,
        });
        if(!donationToPatient) {
            return response.status(500).json({status: "error",
                                            message:"ERRO when adding donation to patient"});
        }
        // console.log(donationToPatient);
        return response.status(201).json({status:"sucess",
                                          message:"Donation to patient scheduled with sucess",
                                          donation: donationToPatient});
    },

    async donationsToPatients(request, response) {
        const donations = await db.DonationToPatient.findAll({
            include: [{
                model: db.Donation,
                as: 'donation',
                attributes: ['donationId', 'donationDate', 'donatorId', 'status'],
            }]
        });
        if(!donations) {
            return response.status(500).json({status: "error",
                                            message:"ERRO when getting donations"});
        }
        return response.status(200).json({status:"sucess",
                                          message:"Donations retrieved with sucess",
                                          donations});
                            

    }
}