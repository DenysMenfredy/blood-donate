const db = require('../../models');

module.exports = {
    async create(request, response) {
        const {name, address, city, state, phone} = request.body;
        
        const bloodBank = await db.BloodBank.create({
            name,
            address,
            city,
            state,
            phone
        });

        if (!bloodBank) {
            return response.status(400).json({error: 'Blood bank not created'});
        }
        return response.status(201).json(bloodBank);
    },

    async getId(request, response) {
        const {name} = request.params;
        

        const bloodBank = await db.BloodBank.findOne({
            where: {
                name: name
            },
            attributes: ['id']
        });

        if (!bloodBank) {
            return response.status(400).json({error: 'Blood bank not found'});
        }
        return response.status(200).json(bloodBank);

    },
    async getAll(request, response) {
        const bloodBanks = await db.BloodBank.findAll();

        if (!bloodBanks) {
            return response.status(400).json({error: 'Blood banks not found'});
        }
        return response.status(200).json(bloodBanks);
    }
};