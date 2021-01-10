const db = require('../../db');


module.exports = {

    async create(request, response) {

        const {nome, idade, sexo, username, senha, telefone, tipo_sanguineo} = request.body;
	
        const query = 'INSERT INTO doador (nome, idade, sexo, username, senha, telefone, tipo_sanguineo)VALUES($1, $2, $3, $4, $5, $6, $7);';
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
        const query = 'SELECT * FROM doador WHERE username=$1';
        // console.log(username, password);

        try {
            const {rows} = await db.query(query, [username]);
            if(!rows[0]) {
                return res.status(404).send({"message": "Username não encontrado"});
            }
            if(rows[0].senha != password) {
                return res.status(404).send({"message": "Senha incorreta"});
            }
            req.session.loggedin = true;
            req.session.username = username;
            // console.log(req.session);
            return res.status(200).send({"userInfo": {"id":rows[0].id_doador, 
                                                      "username":req.session.username}});
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async index(req, res) {
        // console.log(req.headers)
        const userName = req.headers.authorization;
        // console.log(userName);
        const query = 'SELECT * FROM doador WHERE username=$1';
        const {rows} = await db.query(query, [userName]);
        // console.log(rows[0])
        return res.status(200).send(rows[0]);
    },

    async getId(request, response) {
        const {username} = request.body;
        const query = 'SELECT id_doador FROM doador WHERE username=$1';

        // console.log(query);
        await db.query(query, [userName], (err, results) => {
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
        const query = 'SELECT dp.id, p.nome, p.tipo_sanguineo, p.motivo, p.sexo, p.idade, dp.data_doacao::DATE AS data_doacao FROM doacao_paciente dp INNER JOIN paciente p ON dp.id_paciente=p.id_paciente WHERE id_doador=$1 ORDER BY data_doacao;';

        await db.query(query, [id], (err, results) => {
            if(err) {
            //   console.log(err);
              return response.status(400).send(err);
            }
            // console.log(results);
           if (results.rows.length > 0) {
               return response.status(200).send(results.rows);
           } else {
               return response.status(204);
           }
           
        });
    },

    async getDonationsToBanks(request, response) {
        const {id} = request.body;
        const query = 'SELECT db.id, b.nome, b.endereco, b.cidade, b.uf, b.telefone, db.data_doacao FROM doacao_banco db INNER JOIN banco_sangue b ON db.id_banco_sangue=b.id_banco WHERE id_doador=$1 ORDER BY data_doacao;';

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