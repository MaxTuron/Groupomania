const db = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.createComment = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const name = jwtUtils.getUserName(headerAuth);
    const lastName = jwtUtils.getUserLastName(headerAuth);
    console.log(name,lastName)
    if(userId<0 ){
        return res.status(400).json({ 'error': 'wrong token' })
    }else {
        const comment = new db.comments({
            comment: req.body.comment,
            idMessage: req.body.idMessage,
            name: name,
            lastName: lastName,
            userId: userId,
        });
        console.log(comment)
        comment
            .save()
            .then(() => res.status(201).json({message: 'Commentaire réussie'}))
            .catch(error => res.status(400).json({error}));
    }
};

exports.getOneComment = (req, res, next) => {

        const commentData = {};
        db.comments.findOne({where: {id: req.params.id}})
            .then(comments => {
                commentData.id = comments.id;
                commentData.comment = comments.comment;
                commentData.userId = comments.userId;
            })
            .then(() => {
                res.status(200).json(commentData);
            })
            .catch(error => res.status(404).json({error}));
};

exports.getAllComment = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    if(userId<0){
        return res.status(400).json({ 'error': 'wrong token' })
    }else {
        db.comments.findAll({order: [['createdAt', 'DESC']]})
            .then((comments) => {
                res.status(200).json({comments})
            })
            .catch((error) => res.status(500).json({error}));
    }
};


exports.deleteComment = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    if(userId<0){
        return res.status(400).json({ 'error': 'wrong token' })
    }else {
        console.log(req, res, next);
        db.comments.destroy({where: {id: req.params.id}})
            .then(() => res.status(200).json({message: 'comments supprimé'}))
            .catch(error => console.log(error));
    }
};


