const db = require("../models");

module.exports = (req, res, next) => {
    const userId = req.userId;
    const admin = req.admin;
    try{
        db.messages.findOne({ where: { userId: userId } })
            .then((messagesFound) => {
                if(!messagesFound || messagesFound.userId!==userId){
                    return res.status(400).json({ 'error': 'Vous n\'etes pas l\`auteur du message' })
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