const db = require('../db/connection');

module.exports = {
    async create(request, response) {
        const {nome, idade, sexo, tipo_sanguineo, motivo} = request.body;
        const query = 'INSERT INTO paciente (nome, idade, sexo, tipo_sanguineo, motivo) VALUES ($1, $2, $3, $4, $5)';
        const params = [nome, idade, sexo, tipo_sanguineo, motivo];

        await db.query(query, params, (err, result) => {
            if (err) {
                console.log(err);
                db.end();
                return response.status(400).send("Erro ao adicionar paciente");
            }
            return response.status(200).send("Paciente adicionado com sucesso")
        });
    },

    async getAll(request, response) {
	const {donatorId} = request.body;
        const query = 'SELECT * FROM get_patients($1)';

        await db.query(query, [donatorId], (err, result) => {
            if(err) {
                return response.status(400).send(err);
            }
            return response.status(200).send(result.rows);
        });
    }

};