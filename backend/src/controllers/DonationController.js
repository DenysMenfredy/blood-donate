const db = require('../db/connection');


module.exports = {

    async donateToBank(request, response) {
        const {donatorId, bankId, data} = request.body;
        console.log(data);
        const query = 'CALL doacao_banco($1, $2, $3)'
        
        await db.query(query, [donatorId, bankId, data], (err, results) => {
            if(err) {
                if (err.code === '22012') {
                    console.log('erro na diferença de datas...');
                    return response.status(502).send("ERRO ao adicionar doação");
                }
                // db.end();
            }
            console.log(results);
            return response.status(200).send("Doação realizada");
            // db.end();
        });
    },

    async donateToPatient(request, response) {
        const {donatorId, patientId, data} = request.body;
        // console.log(donatorId, patientId, data);
        const query = 'INSERT INTO doacao_paciente (id_doador, id_paciente, data_doacao) VALUES ($1, $2, $3)';

        await db.query(query, [donatorId, patientId, data], (err, results) => {
            if(err) {
                // console.log(err);
                return response.status(502).send("Erro ao adicionar doação");
            }
                return response.status(200).send("Doação realizada");
         });
    }
}