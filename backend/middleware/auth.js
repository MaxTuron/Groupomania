//importe package jsonwebtoken
const jwt = require('jsonwebtoken');

// exporte le middleware
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken= jwt.verify(token, 'CLESECRETAMODIF');
        req.userId = decodedToken.userId;
        req.admin = decodedToken.admin;
        next();
    }
    catch(error){
        res.status(401).json({error: error && 'Requete non authentifié!'});
    }
};
