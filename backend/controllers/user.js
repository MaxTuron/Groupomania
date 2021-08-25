const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");
const Sequelize = require('sequelize');

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


exports.getProfileList = (req, res, next) => {
    db.user.findAll()
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    db.user.destroy({where: {id:req.query.id}})
        .then(res.status(200).json({ message: 'User deleted !' }))
        .catch(error => res.status(400).json({ error }));
};
