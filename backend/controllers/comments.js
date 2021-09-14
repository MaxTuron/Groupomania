const db = require('../models');

exports.createComment = (req, res, next) => {
    const comment = new db.comments({
        comment: req.body.comment,
        idMessage: req.body.idMessage,
        userId: req.body.userId
    });
    comment
        .save()
        .then(() => res.status(201).json({message: 'Commentaire réussie'}))
        .catch(error => res.status(400).json({error}));
};

exports.getOneComment = (req, res, next) => {
    const commentData = {};
    db.comments.findOne({ where: { id: req.params.id } })
        .then(comments => {
            commentData.id = comments.id;
            commentData.comment = comments.comment;
            commentData.userId = comments.userId;
        })
        .then(() => {
            console.log(commentData)
            res.status(200).json(commentData);
        })
        .catch(error => res.status(404).json({ error }));
};

exports.getAllComment = (req, res, next) => {
    db.comments.findAll({ order: [['createdAt', 'DESC']]})
        .then((comments) => {
            res.status(200).json({comments})
        })
        .catch((error) => res.status(500).json({ error }));
};


exports.deleteComment = (req, res, next) => {
    console.log(req, res, next);
    db.comments.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'comments supprimé' }))
        .catch(error => console.log(error));
};

