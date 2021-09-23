//Vérification admin ou non
const db = require("../models");

module.exports = (req, res, next) => {
    const userId = req.userId;
    const admin = req.admin;
    console.log(userId)
    console.log(admin)
    try{
        db.user.findOne({ where: { id: userId } })
            .then((userFound) => {
                if(!userFound || admin===false){
                    return res.status(400).json({ 'error': 'Vous n\etes pas admin' })
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