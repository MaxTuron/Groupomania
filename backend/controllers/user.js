const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");

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
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        admin: user.admin,
                        name: user.name,
                        lastName: user.lastName,
                        token: jwt.sign(
                            //ID utilisateur
                            { userId: user._id },
                            //Chaîne secrète de développement temporaire
                            'RANDOM_TOKEN_SECRET',
                            //Défini la durée du token
                            { expiresIn: '24h' })
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.getAllUser = (req, res, next) => {
    db.user.findAll()
        .then((users) => res.status(200).json({users}))
        .catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    console.log(req, res, next);
    db.user.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Utlisateur supprimé' }))
        .catch(error => console.log(error));
};

exports.deleteOneUser = (req, res, next) => {

    if (req.query.admin) {
        db.user.destroy({ where: { id: req.query.id } })
            .then(res => {
                res.status(200).json({ message: 'L\'utilisateur à été supprimé' });
            })
            .catch(error => res.status(400).json({ error }));
    } else {
        res.status(401).json({ message: ' Action non autorisée ' });
    }
};

exports.getOneUser = (req, res, next) => {
    const userData = {};
    db.user.findOne({ where: { id: req.params.id } })
        .then(user => {
            userData.id = user.id;
            userData.name = user.name;
            userData.lastName = user.lastName;
            userData.email = user.email;
            userData.createdAt = user.createdAt;
            userData.admin = user.admin;
        })
        .then(() => {
            console.log(userData)
            res.status(200).json(userData);
        })
        .catch(error => res.status(404).json({ error }));
};

exports.updateUser = (req, res, next) => {
    console.log(req.params.id);
    console.log(req.body.name);
    console.log(req.body.lastName);
    console.log(req.body.email);

    db.user.update({ name: req.body.name },{ lastName: req.body.lastName},{ email: req.body.email }, { returning: true, where: { id: req.params.id } })
        .then(() => {res.status(200).json({ message: 'Profil modifié !'});})
        .catch(error => res.status(400).json({ error }));
};