const db = require('../../db');

module.exports = {
    async create(req, res) {
        const { id } = req.body;
        const query = 'SELECT username FROM doador WHERE id_doador=$1;';
        const donator = await db.query(query, id);
        
        if(!donator) {
            return res.status(400).json({error: "No donator found with this ID"});
        }

        return res.json(donator);
    }
} 