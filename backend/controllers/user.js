const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");

exports.signup = (req, res) => {
    db.user.findOne({
        where: { email: req.body.email },
    })
        .then((userFound) => {
            if (!userFound) {
                bcrypt.hash(req.body.password, 10).then((hash) => {
                    db.user.create({
                        email: req.body.email,
                        password: hash,
                        admin: 0,
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
