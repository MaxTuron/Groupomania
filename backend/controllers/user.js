const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                admin: 0,
            });
            console.log(user);
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json('Test erreur'));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            //Vérification de l'email
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    //Vérification du mdp
                    if (!valid){
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    //Génération du Token
                    res.status(200).json({userId: user._id, token: jwt.sign(
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