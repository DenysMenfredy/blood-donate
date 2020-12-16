const pool = require('../db_connection');


module.exports = {

    async create(request, response) {

        const {nome, idade, sexo, username, senha, telefone, tipo_sanguineo} = request.body;
        const query = {text:'INSERT INTO doador (nome, idade, sexo, username, senha, telefone, tipo_sanguineo)VALUES($1, $2, $3, $4, $5, $6, $7);',
                       values: [nome, idade, sexo, username, senha, telefone, tipo_sanguineo]};
        
        await pool.query(query, (err, result) => {
            if(err) {
                console.log(err);
                response.status(400).send("Erro ao adicionar dados");
                // console.log(query);
                pool.end();
            }
                response.status(200).send("Adicionado com sucesso");
        });

    },

    async login(req, res) {
        const {username, password} = req.body;
        const query = 'SELECT * FROM doador WHERE username=$1';
        console.log(username, password);

        try {
            const {rows} = await pool.query(query, [username]);
            if(!rows[0]) {
                return res.status(400).send({"message": "Username não encontrado"});
            }
            if(rows[0].senha != password) {
                return res.status(400).send({"message": "Senha incorreta"});
            }
            return res.status(200).send({"id_doador": rows[0].id_doador});
        } catch(err) {
            return res.status(400).send(err)
        }
    },

    async index(req, res) {
        const donatorId = req.headers.authorization;
        const query = 'SELECT * FROM doador WHERE id_doador=$1';
        const {rows} = await pool.query(query, [donatorId]);
        return res.status(200).send(rows[0]);
    },

    async getId(request, response) {
        const {username} = request.body;
        const query = {text: 'SELECT * FROM doador WHERE username=$1',
                       values:[username]};

        // console.log(query);
        await pool.query(query, (err, results) => {
            if(err) {
                response.status(400).send(err);
                pool.end();
            }
            console.log(results.rows[0].id_doador);
            response.send({"id_banco": results.rows[0].id_doador});
        });

    },

    async getDonationsToPatients(request, response) {
        const {id} = request.body;
        const query = {text: 'SELECT p.nome, p.tipo_sanguineo, p.sexo, p.idade, dp.data_doacao FROM doacao_paciente dp INNER JOIN paciente p ON dp.id_paciente=p.id_paciente WHERE id_doador=$1 ORDER BY data_doacao;',
                       values:[id]};

        await pool.query(query, (err, results) => {
            if(err) {
                response.status(400).send(err);
            }
            response.status(200).send(results.rows);
        });
        
    },

    async getDonationsToBanks(request, response) {
        const {id} = request.body;
        const query = {text: 'SELECT b.nome, b.endereco, b.cidade, b.uf, b.telefone, db.data_doacao FROM doacao_banco db INNER JOIN banco_sangue b ON db.id_banco_sangue=b.id_banco WHERE id_doador=$1 ORDER BY data_doacao;',
                       values:[id]};

        await pool.query(query, (err, results) => {
            if(err) {
                response.status(400).send(err);
            }
            response.status(200).send(results.rows);
        });
        
    },

    async numDonations(request, response) {
        const {id} = request.body;
        const query = {text: 'SELECT COUNT(*) FROM doacao_paciente dp INNER JOIN doacao_banco db ON dp.id_doador=db.id_doador WHERE db.id_doaor=$1 AND dp.id_doador=$1 ;',
                       values: [id]};
        
        await pool.query(query, (err, results) => {
            if (err) {
                response.status(400).send(err);
            }
            response.status(200).send({"num_donations":rows[0]});
        });
    }

};