const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.PassJWT);
        const admin = decodedToken.admin;

        if(req.body.admin && req.body.admin !== admin){
            throw 'Admin not valid !'
        }else{
            next()
        }

    }

    catch(error){
        res.status(403).json({error: new Error('Unauthorized request !')});
    }
};