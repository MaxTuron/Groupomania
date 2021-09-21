// Vérifier si la ressource (compte message ou commentaire) est la propriété cu client ou admin
const db = require("../models");

module.exports = (req, res, next) => {
    const userId = req.userId;
    const admin = req.admin;
    console.log(userId)
    console.log(admin)
    try{
        db.user.findOne({ where: { id: userId } })
            .then((userFound) => {
                if(!userFound || userId<0){
                    return res.status(400).json({ 'error': 'wrong token' })
                }else {
                    next();
                }

            })
            .catch((error) => res.status(401).json({ error }));
    }
    catch(error){
        res.status(401).json({error: error && 'Requete non authentifié!'});
    }
};