const pool = require('../db_connection');

module.exports = {
    async create(request, response) {
        const {nome, idade, sexo, tipo_sanguineo, motivo} = request.body;
        const query = {text: 'INSERT INTO paciente (nome, idade, sexo, tipo_sanguineo, motivo) VALUES ($1, $2, $3, $4, $5)',
                       values: [nome, idade, sexo, tipo_sanguineo, motivo]};
                       
        await pool.query(query, (err, result) => {
            if (err) {
                console.log(err);
                pool.end();
                return response.status(400).send("Erro ao adicionar paciente");
            }
            return response.status(200).send("Paciente adicionado com sucesso")
        });
    },

    async getAll(request, response) {
	const {donatorId} = request.body;
        const query = {text:'SELECT * FROM get_patients($1)', values:[donatorId]};
        await pool.query(query, (err, result) => {
            if(err) {
                return response.status(400).send(err);
            }
            return response.status(200).send(result.rows);
        });
    }

};