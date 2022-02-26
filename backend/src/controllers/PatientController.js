const db = require('../../models');


module.exports = {
    async create(request, response) {
        console.log(request.body);
        const {name, birthDate, sex, bloodType, phone, reason} = request.body;
        
        const user = db.User.create({
            name: name,
            birthDate: new Date(birthDate),
            sex: sex,
            bloodType: bloodType,
            phone: phone,
        }).then((user) => {
            const patient = db.Patient.create({
                userId: user.userId,
                reason: reason
            }).then((patient) => {
                return response.status(201).json({
                    message: 'Patient created successfully',
                    patient: patient
                });
            }).catch((err) => {
                console.log(err);
                return response.status(500).json({
                    message: 'Error creating patient'
                });
            })
        }).catch((err) => {
            console.log("Error creating the user", err);
            return response.status(500).json({
                message: 'Error creating the user'
            });
        });

    },

    async index(request, response) {
        const {patientId} = request.params;

        const patient = await db.Patient.findOne({
            include: [{
                model: db.User,
                as: 'user',
                attributes: ['name', 'birthDate', 'bloodType', 'sex'],
                // required: true,
            }],
            attributes: ['patientId', 'reason'],
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