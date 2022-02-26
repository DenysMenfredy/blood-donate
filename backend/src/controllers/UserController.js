const db  = require('../../models');

module.exports = {
    async getBloodType(request, response) {
        const {userId} = request.body;
        // console.log(userId);

        const user = db.User.findOne({
            attributes: ['bloodType'],
            where: {
                userId: userId
            },
            include: [{
                model: db.Donator,
                // as: 'donator',
            }],
        }).then((user) => {
            console.log(user);
            return response.status(200).json(user);
        }).catch((err) => {
            console.log(err);
            return response.status(500).json({
                message: 'Error getting blood type'
            });
        });

    },
}