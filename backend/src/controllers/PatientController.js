const db = require('../../models');

module.exports = {
    async create(request, response) {
        console.log(request.body);
        const {name, birthDate, sex, bloodType, phone, reason} = request.body;
        
        const user = await db.User.create({
            name: name,
            birthDate: new Date(birthDate),
            sex: sex,
            bloodType: bloodType,
            phone: phone,
        });
        if(user) {
            const patient = await db.Patient.create({
                userId: user.userId,
                reason: reason
            });
            if(patient) {
                return response.status(201).json({
                    success: true,
                });
            } else {
                return response.status(500).json({
                    success: false,
                    message: 'Error creating patient'
                });
            }
        } else {
            return response.status(500).json({
                error: 'User not created'
            });
        }
    },

    async getAll(request, response) {
        const {donatorId} = request.body;

        // Remember what is the purpose of this query?
    }

};