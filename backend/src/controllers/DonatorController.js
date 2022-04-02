// const {sequelize} = require('../db/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db  = require('../../models');



const SECRET_KEY = 'strongUniqueAndRandom';

module.exports = {

    async create(request, response) {
        // console.log(request.body);
        const {name, birthDate, gender, username, password, phone, bloodType} = request.body;
	
        // const query = 'CALL insert_doador($1, $2, $3, $4, $5, $6, $7);';
        // const params = [nome, idade, sexo, username, senha, telefone, tipo_sanguineo]

        const user = db.User.create({
            name: name,
            birthDate: new Date(birthDate),
            sex: gender,
            bloodType: bloodType,
            phone: phone,
        }).then((user) => {
            console.log(user);
            const donator = db.Donator.create({
                userId: user.userId,
                username: username,
                password: password
            }).then((donator) => {
                return response.status(201).json({
                    message: 'Donator created successfully',
                    donator: donator
                });
            }).catch((err) => {
                console.log(err);
                return response.status(500).json({
                    message: 'Error creating donator'
                });
        }).catch((err) => {
            console.log("Error creating the user", err);
            return response.status(500).json({
                message: 'Error creating the user'
            });
        })
    });      


    },

    async login(req, res) {
        // req.session.name = 'hello';
        
        const {username, password} = req.body;
        
        const donator = await db.Donator.findOne({
            where: {
                username: username,
                password: password
            }
        });
        if(donator) {
            const token = jwt.sign({
                donatorId: donator.donatorId,
                userId: donator.userId,
                username: donator.username,
                password: donator.password,
            }, SECRET_KEY, {
                expiresIn: '2h'
            });
            return res.status(200).json({
                message: 'Logged in',
                token: token,
                expiresIn: 3600
            });
        } else {
            return res.status(404).json({
                cod: '404',
                message: 'Invalid credentials'
            });
        }
        
    },

    async validate(req, res) {
        // console.log(req.headers);
        const bearer = req.headers['x-acess-token'] || req.headers['authorization'];
        const [, token] = bearer.split(' ');
        // console.log(token);

        if(token) {
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: 'Token invalid'
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: 'Token valid',
                    decoded
                });

            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Token not provided'
            });
        }

    },


    async index(req, res) {
        // TODO: fix association to return user information
        // console.log(req.params);
        const {donatorId} = req.params;
        const uuid4Pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (!String(donatorId).match(uuid4Pattern)) {
            return res.status(400).json({
                message: 'Invalid donatorId. Must be a valid UUID4'
            });
        }
        // console.log('Indexing from ID:', donatorId);
        const donator = await db.Donator.findOne({
            include: [{
                model: db.User,
                as: 'user',
                attributes: ['name', 'birthDate', 'bloodType', 'sex'],
                // required: true,
            }],
            attributes: ['donatorId', 'username', 'password'],
            where: {
                donatorId: donatorId,
            },
        });
        // console.log('donator:', donator);
        if (donator) {
            return res.status(200).json({
                donator
        })};
        
        return res.status(404).json({
            message: 'Donator not found'
        });
        
    },

    async getId(request, response) {
        // console.log(request.body);
        const {username} = request.body;

        const donatorId = await db.Donator.findOne({
            attributes: ['donatorId'],
            where: {
                username: username
            }
        });

        if (donatorId) {
            return response.status(200).json(donatorId);
        }

        return response.status(404).json({
            success: false,
            message: 'Donator not found'
        });

    },

    async getAll(request, response) {
        const donators = await db.Donator.findAll({
            include: [{
                model: db.User,
                as: 'user',
                attributes: ['name', 'birthDate', 'bloodType', 'sex', 'phone', 'email']
        }]});
        
        if (donators) {
            return response.status(200).json(donators);
        }

        return response.status(404).send('Donators not found');
    },


    // async getDonationsToPatients(request, response) {
    //     const {id} = request.body;
    //     const query = 'SELECT * FROM doacoes_paciente($1);';

    //     await db.query(query, [id], (err, results) => {
    //         if(err) {
    //         //   console.log(err);
    //           return response.status(400).send(err);
    //         }
    //         // console.log(results);
    //        if (results.rows.length > 0) {
    //            return response.status(200).send(results.rows);
    //        } else {
    //            return response.status(204).send('No donations');
    //        }
           
    //     });
    // },

    // async getDonationsToBanks(request, response) {
    //     const {id} = request.body;
    //     const query = 'SELECT * FROM doacoes_banco($1);';

    //     await db.query(query, [id], (err, results) => {
    //         if(err) {
    //             return response.status(400).send(err);
    //         }
    //         return response.status(200).send(results.rows);
    //     });
        
    // },

    async numDonations(request, response) {
        const {donatorId} = request.body;
        

        const [donations] = await db.Donation.findAll({
            attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('donationId')), 'numDonations']],
            where: {
                donatorId: donatorId
            },
        });

        if (donations) {
            // console.log(donations);
            return response.status(200).json(donations);
        }
        return response.status(404).send('Donations not found');
            

    }

};