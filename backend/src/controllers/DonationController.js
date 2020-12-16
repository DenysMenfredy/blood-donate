const pool = require('../db_connection');


module.exports = {


    async donateToBank(request, response) {
        const {donatorId, bankId, date} = request.body;
        const query = {text: 'INSERT INTO doacao_banco (id_doador, id_banco_sangue, data_doacao) VALUES ($1, $2, $3)',
                       values:[donatorId, bankId, date]};
        
        await pool.query(query, (err, results) => {
            if(err) {
                response.status(400).send(err);
                pool.end();
            }
            response.status(200).send("Doação realizada");
        });
    },

    async donateToPatient(request, response) {
        const {donatorId, patientId, data} = request.body.data;
        console.log(data);
        const query = {text: 'INSERT INTO doacao_paciente (id_doador, id_paciente, data_doacao) VALUES ($1, $2, $3)',
                       values: [donatorId, patientId, data]};

        await pool.query(query, (err, results) => {
            if(err) {
                console.log(err);
                return response.status(400).send("Erro ao adicionar doação");
                pool.end();
            }
                return response.status(200).send("Doação realizada");
         });
    }
}