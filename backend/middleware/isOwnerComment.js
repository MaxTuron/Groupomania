
const db = require("../models");

module.exports = (req, res, next) => {
    const userId = req.userId;
    const admin = req.admin;
    try{
        db.user.findOne({ where: { id: userId } })
            .then((userFound) => {
                if(!userFound || userId!==userFound.id){
                    return res.status(400).json({ 'error': 'wrong token' })
                }else {
                    req.userId = userId;
                    req.admin = admin;
                    next();
                }

            })
            .catch((error) => res.status(401).json({ error }));
    }
    catch(error){
        res.status(401).json({error: error && 'Requete non authentifié!'});
    }
};