// Vérifier si la ressource (compte message ou commentaire) est la propriété cu client ou admin

module.exports = (req, res, next) => {
    const userId = req.userId;
    const admin = req.admin;
    try{

    }
    catch(error){
        res.status(401).json({error: error && 'Requete non authentifié!'});
    }
};