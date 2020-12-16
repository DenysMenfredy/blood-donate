const pool = require('../db_connection');

module.exports = {
    async create(request, response) {
        const {nome, endereco, cidade, uf, telefone} = request.body;
        const query = {text: 'INSERT INTO banco_sangue (nome, endereco, cidade, uf, telefone) VALUES ($1, $2, $3, $4, $5)', 
                       values: [nome, endereco, cidade, uf, telefone]
                      };

        await pool.query(query, (err, res) => {
            if(err) {
                console.log(err);
                response.status(400).send("Erro ao adicionar banco de sangue");
                pool.end();
            }
            response.status(200).send("Banco de sangue adicionado com sucesso");
        });
    },

    async getId(request, response) {
        const {nome} = request.body;
        const query = {text: 'SELECT * FROM banco_sangue WHERE nome=$1',
                       values:[nome]};

        // console.log(query);
        await pool.query(query, (err, results) => {
            if(err) {
                response.status(400).send(err);
                pool.end();
            }
            console.log(results.rows[0].id_banco);
            response.send({"id_banco": results.rows[0].id_banco});
        });

    }
};