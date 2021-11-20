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

    async index(request, response) {
        const {patientId} = request.params;

        const patient = await db.Patient.findOne({
            where: {
                patientId: patientId
            },
        });

        if(patient) {
            return response.status(200).json({
                success: true,
                patient: patient
            });
        }
        return response.status(404).json({
            success: false,
            message: 'Patient not found'
        });
        
    },

    async getAll(request, response) {
        const patients = await db.Patient.findAll({
            include: [{
                model: db.User,
                as: 'user',
                attributes: ['name', 'birthDate', 'phone', 'bloodType', 'sex', 'email'],
        }]});
        
        if(patients) {
            return response.status(200).send(patients);
        }
        return response.status(404).json({
            message: 'Patients not found'
        });
    },


};