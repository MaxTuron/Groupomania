const db = require('../models');

//Créer un message//

exports.createMessage = (req, res, next) => {
    let imagePost = '';
    if (req.file) {
        imagePost = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    const message = new db.messages({
        content: req.body.content,
        userId: req.body.userId,
        title: req.body.title,
        urlImage: imagePost
    });
    message
        .save()
        .then(() => res.status(201).json({message: 'Publication réussie'}))
        .catch(error => res.status(400).json({error}));
};

exports.getOneMessage = (req, res, next) => {
    const messageData = {};
    db.messages.findOne({ where: { id: req.params.id } })
        .then(message => {
            messageData.id = message.id;
            messageData.title = message.title;
            messageData.content = message.content;
            messageData.urlImage = message.urlImage;
            messageData.userId = message.userId;
        })
        .then(() => {
            console.log(messageData)
            res.status(200).json(messageData);
        })
        .catch(error => res.status(404).json({ error }));
};

exports.getAllMessages = (req, res, next) => {
    db.messages.findAll({ order: [['createdAt', 'DESC']]})
        .then((messages) => {
            res.status(200).json({messages})
        })
        .catch((error) => res.status(500).json({ error }));
};


exports.deleteMessage = (req, res, next) => {
    console.log(req, res, next);
    db.messages.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Message supprimé' }))
        .catch(error => console.log(error));
};

exports.updateMessage = (req, res, next) => {
    let imagePost = '';
    if (req.file) {
        imagePost = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    req.body.urlImage = imagePost,
    db.messages.update(req.body, { returning: true, where: { id: req.params.id } })
        .then(() => res.status(201).json({message: 'Modification réussie'}))
        .catch(error => res.status(400).json({error}));
};

