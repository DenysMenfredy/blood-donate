const db = require('../../models');

module.exports = {
    async create(request, response) {
        const {name, address, city, state, phone} = request.body;
        
        const bloodBank = db.BloodBank.create({
            name: name,
            address: address,
            city: city,
            state: state,
            phone: phone
        }).then((bloodBank) => {
            return response.status(201).json({bloodBank: bloodBank});
        }).catch((err) => {
            console.log(err);
            return response.status(500).json({error: "Error creating blood bank"});
        });

    },

    async getId(request, response) {
        const {name} = request.params;
        

        const bloodBank = await db.BloodBank.findOne({
            where: {
                name: name
            },
            attributes: ['blood_bank_id']
        });

        if (!bloodBank) {
            return response.status(400).json({error: 'Blood bank not found'});
        }
        return response.status(200).json(bloodBank);

    },
    async getAll(request, response) {
        const bloodBanks = db.BloodBank.findAll({
            attributes: ['blood_bank_id', 'name', 'address', 'city', 'state', 'phone']
        }).then((bloodBanks) => {
            return response.status(200).json(bloodBanks);
        }).catch((err) => {
            console.log(err);
            return response.status(400).json({error: 'Error getting blood banks'});
        });

    }
};