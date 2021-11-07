// const {sequelize} = require('../db/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db  = require('../../models');
const { getAll } = require('./PatientController');

const SECRET_KEY = 'strongUniqueAndRandom';

module.exports = {

    async create(request, response) {
        console.log(request.body);
        const {nome, dataNascimento, sexo, username, password, telefone, tipo_sanguineo} = request.body;
	
        // const query = 'CALL insert_doador($1, $2, $3, $4, $5, $6, $7);';
        // const params = [nome, idade, sexo, username, senha, telefone, tipo_sanguineo]

        const user = await db.User.create({
            name: nome,
            birthDate: new Date(dataNascimento),
            sex: sexo,
            bloodType: tipo_sanguineo,
            phone: telefone
        });
        if(user) {
            console.log(user);
            const donator = await db.Donator.create({
                userId: user.userId,
                username: username,
                password: password
            });
            console.log('Donator:', donator);
            if(donator) {
                console.log('Donator created');
                return response.status(201).json(donator);
            }
        } else {
            console.log('User not created');
            return response.status(500).send('User not created');
        }        


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
                donatorId: donator.userId,
                username: donator.username,
                password: donator.password
            }, SECRET_KEY, {
                expiresIn: '2m'
            });
            return res.status(200).json({
                message: 'Logged in',
                token: token,
                expiresIn: 120
            });
        } else {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }
        
    },

    async validate(req, res) {
        // console.log(req.headers);
        const bearer = req.headers.authorization;
        const [, token] = bearer.split(' ');
        // console.log(token);

        try {
            const payload = jwt.verify(token, SECRET_KEY);
            console.log(payload);
            return res.status(200).json(payload);
        } catch(err) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }

    },


    async index(req, res) {
        // console.log(req.params);
        const {donatorId} = req.params;
        console.log(donatorId);

        const donator = await db.Donator.findOne({
            where: {
                donatorId: donatorId
            }
        });

        if (donator) {
            console.log(donator);
            return res.status(200).json(donator);
        }

        return res.status(404).send('Donator not found');

        // if (!response) {
        //     return res.status(400).json({error: "User not found"});
        // }
        // return res.json(response.rows[0]);
    },

    async getId(request, response) {
        console.log(request.body);
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

        return response.status(404).send('Donator not found');

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
    }

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

    // async numDonations(request, response) {
    //     const {donatorId} = request.body;
    //     const query = 'SELECT * FROM num_donations($1);';
        
    //     await db.query(query, [donatorId], (err, results) => {
    //         if (err) {
    //             return response.status(400).send(err);
    //         }
    //         return response.status(200).send({"num_donations":results.rows[0].num_donations});
	//     //console.log(results.rows[0]);
    //     });
    // }

};