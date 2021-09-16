//importe package jsonwebtoken
const jwt = require('jsonwebtoken');

// exporte le middleware
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken= jwt.verify(token, 'CLESECRETAMODIF');
        const userId = decodedToken.userId;

        if (req.body.userId === userId) {
            console.log('token authentifié')
            next();
            throw 'User id non valable !';
        } else {
            console.log('token authentifié')
            next();
        }
    }
    catch(error){
        res.status(401).json({error: error && 'Requete non authentifié!'});
    }
};
