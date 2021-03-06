const db = require('../db/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {

    async create(request, response) {

        const {nome, idade, sexo, username, senha, telefone, tipo_sanguineo} = request.body;
	
        const query = 'CALL insert_doador($1, $2, $3, $4, $5, $6, $7);';
        const params = [nome, idade, sexo, username, senha, telefone, tipo_sanguineo]

        await db.query(query, params, (err, result) => {
            if(err) {
                console.log(err);
                return response.status(400).send("Erro ao adicionar dados");
                // console.log(query);
                // db.end();
            }
                return response.status(200).send("Adicionado com sucesso");
        });

    },

    async login(req, res) {
        // req.session.name = 'hello';
        
        const {username, password} = req.body;
        const query = 'SELECT * FROM doador WHERE username=$1 AND senha=$2';
        // console.log(username, password);
        const SECRET_KEY = 'strongUniqueAndRandom';
        const data = [username, password]

        await db.query(query, data, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(400).send("Erro ao fazer login");
            }

            if(!result.rows[0]) {
                return res.status(404).json({ message: "User not found"});
            }

            const {id_doador} = result.rows[0];
            
            const payload = {
                sub: id_doador,
                iat: new Date().getTime()
            };

            const token = jwt.sign(payload, SECRET_KEY);
            return res.status(200).json({ token });


        });
    },

    async validate(req, res) {
        const SECRET_KEY = 'strongUniqueAndRandom';
        const bearer = req.headers.authorization;
        const [, token] = bearer.split(' ');

        const payload = jwt.verify(token, SECRET_KEY);

        if(payload) {
            console.log(payload);
            return res.send(200).json( {message: "User authenticated with sucess",
                                        id: payload.sub}
                                        );
        }

        return res.send(400).send( {message: "Error in authentication..."} );

    },

    async index(req, res) {
        // console.log(req.headers)
        const {donatorId} = req.body;
        const query = 'SELECT nome, tipo_sanguineo, sexo FROM doador WHERE id_doador=$1';
        const response = await db.query(query, [donatorId]);
        // console.log(rows[0])
        if (!response) {
            return res.status(400).json({error: "User not found"});
        }
        return res.json(response.rows[0]);
    },

    async getId(request, response) {
        const {username} = request.body;
        const query = 'SELECT id_doador FROM doador WHERE username=$1';

        // console.log(query);
        await db.query(query, [username], (err, results) => {
            if(err) {
                // db.end();
                return response.status(400).send(err);
            }
            // console.log(results.rows[0].id_doador);
            return response.send({"id_doador": results.rows[0].id_doador});
        });

    },

    async getDonationsToPatients(request, response) {
        const {id} = request.body;
        const query = 'SELECT * FROM doacoes_paciente($1);';

        await db.query(query, [id], (err, results) => {
            if(err) {
            //   console.log(err);
              return response.status(400).send(err);
            }
            // console.log(results);
           if (results.rows.length > 0) {
               return response.status(200).send(results.rows);
           } else {
               return response.status(204).send('No donations');
           }
           
        });
    },

    async getDonationsToBanks(request, response) {
        const {id} = request.body;
        const query = 'SELECT * FROM doacoes_banco($1);';

        await db.query(query, [id], (err, results) => {
            if(err) {
                return response.status(400).send(err);
            }
            return response.status(200).send(results.rows);
        });
        
    },

    async numDonations(request, response) {
        const {donatorId} = request.body;
        const query = 'SELECT * FROM num_donations($1);';
        
        await db.query(query, [donatorId], (err, results) => {
            if (err) {
                return response.status(400).send(err);
            }
            return response.status(200).send({"num_donations":results.rows[0].num_donations});
	    //console.log(results.rows[0]);
        });
    }

};