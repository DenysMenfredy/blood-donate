const db = require('../../db');

module.exports = {
    async create(request, response) {
        const {nome, endereco, cidade, uf, telefone} = request.body;
        const query = 'INSERT INTO banco_sangue (nome, endereco, cidade, uf, telefone) VALUES ($1, $2, $3, $4, $5)';
        const params = [nome, endereco, cidade, uf, telefone];
        
        await db.query(query, params, (err, res) => {
            if(err) {
                console.log(err);
                response.status(400).send("Erro ao adicionar banco de sangue");
                db.end();
            }
            response.status(200).send("Banco de sangue adicionado com sucesso");
        });
    },

    async getId(request, response) {
        const {nome} = request.body;
        const query = 'SELECT * FROM banco_sangue WHERE nome=$1';

        // console.log(query);
        await db.query(query, [nome], (err, results) => {
            if(err) {
                response.status(400).send(err);
                //db.end();
            }
            console.log(results.rows[0].id_banco);
            response.send({"id_banco": results.rows[0].id_banco});
        });

    },
    async getAll(request, response) {
        const query = 'SELECT * FROM banco_sangue';
        await db.query(query, [], (err, result) => {
            if(err) {
                return response.status(400).send(err);
            }
            return response.status(200).send(result.rows);
        });
    }
};