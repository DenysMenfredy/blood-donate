const jwt = require('jsonwebtoken');

module.exports = { 
    verifyJWT(req, res, next) {
    const token = req.headers['x-acess-token'];
    if (!token) return res.status(401).json({auth: false, message: "No token provided"});
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) return res.status(500).json({auth: false, message:"Failed to authenticate"});

        req.userId = decoded.id;
        next();
    });
}

};