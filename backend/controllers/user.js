const bcrypt = require('bcrypt');
const db = require("../models");
const jwtUtils = require('../utils/jwt.utils');

exports.signup = (req, res) => {
    db.user.findOne({where: { email: req.body.email }})
        .then((userFound) => {
            if (!userFound) {
                    bcrypt.hash(req.body.password, 10).then((hash) => {
                        db.user.create({
                            email: req.body.email,
                            password: hash,
                            admin: 0,
                            name: req.body.name,
                            lastName: req.body.lastName,
                        })
                            .then((user) => {
                                res.status(201).json({
                                    id: user.id,
                                });
                            })
                            .catch((error) => res.status(400).json({ error }));

                });
            } else {
                res.status(409).json({
                    error: "Cet utilisateur existe déjà",
                });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};


exports.login = (req, res) => {
    db.user.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
                    bcrypt.compare(req.body.password, user.password) // Si le mail est trouvé, comparaison du cryptage du mot de passe saisi avec celui enregistré
                        .then(validPassword => {
                            if (!validPassword) {
                                return res.status(401).json({error: 'Mot de passe incorrect !'});
                            }
                            return res.status(200).json({
                                'userId': user.id,
                                'admin': user.admin,
                                'token': jwtUtils.generateToken(user),
                            });
                        })
                        .catch(error => res.status(500).json({error}));
                })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    db.user.findOne({where: {id: userId}})
        .then(User => res.status(200).json(User))
        .catch(error => res.status(404).json({error}))
};

exports.getAllUser = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const admin = jwtUtils.getUserAdmin(headerAuth);
if(userId<0 || admin===false){
    return res.status(400).json({ 'error': 'wrong token' })
}else {
    db.user.findAll()
        .then((users) => res.status(200).json({users}))
        .catch((error) => res.status(500).json({error}));
}
};

exports.deleteUser = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    db.user.destroy({ where: { id: userId } })
        .then(() => res.status(200).json({ message: 'Utlisateur supprimé' }))
        .catch(error => console.log(error));
};

exports.deleteOneUser = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const admin = jwtUtils.getUserAdmin(headerAuth);
    if(userId<0 || admin===false ){
        return res.status(400).json({ 'error': 'wrong token' })
    }else if (admin === true) {
        db.user.destroy({ where: { id: req.params.id } })
            .then(res => {
                res.status(200).json({ message: 'L\'utilisateur à été supprimé' });
            })
            .catch(error => res.status(400).json({ error }));
    } else {
        res.status(401).json({ message: ' Action non autorisée ' });
    }
};

exports.updateLastName = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    db.user.update(req.body, { returning: true, where: { id: userId } })
        .then(() => {res.status(200).json({ message: 'Nom modifié !'});})
        .catch(error => res.status(400).json({ error }));
};

exports.updateName = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    db.user.update(req.body, { returning: true, where: { id: userId } })
        .then(() => {res.status(200).json({ message: 'Prenom modifié !'});})
        .catch(error => res.status(400).json({ error }));
};

exports.updateEmail = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    db.user.update(req.body, { returning: true, where: { id: userId } })
        .then(() => {res.status(200).json({ message: 'Email modifié !'});})
        .catch(error => res.status(400).json({ error }));
};

exports.updatePassword = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    bcrypt.hash(req.body.password, 10).then((hash) => {
        req.body.password = hash;
        db.user.update(req.body, {returning: true, where: {id:userId}})
            .then(() => {
                res.status(200).json({message: 'Mot de passe modifié !'});
            })
            .catch(error => res.status(400).json({error}));
    })
};