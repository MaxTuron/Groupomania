const db = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.getOneMessage = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    if(userId<0){
        return res.status(400).json({ 'error': 'wrong token' })
    }else {
        const messageData = {};
        db.messages.findOne({where: {id: req.params.id}})
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
            .catch(error => res.status(404).json({error}));
    }
};

exports.getAllMessages = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    if(userId<0){
        return res.status(400).json({ 'error': 'wrong token' })
    }else {
        db.messages.findAll({order: [['createdAt', 'DESC']]})
            .then((messages) => {
                res.status(200).json({messages})
            })
            .catch((error) => res.status(500).json({error}));
    }
};


exports.deleteMessage = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const admin = jwtUtils.getUserAdmin(headerAuth);
    if(userId<0 || admin===false){
        return res.status(400).json({ 'error': 'wrong token' })
    }else {
        db.messages.destroy({where: {id: req.params.id}})
            .then(() => res.status(200).json({message: 'Message supprimé'}))
            .catch(error => console.log(error));
    }
};

exports.updateMessage = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    if(userId<0 ){
        return res.status(400).json({ 'error': 'wrong token' })
    }else {
        let imagePost = '';
        if (req.file) {
            imagePost = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }
        const message = {
            content: req.body.content,
            title: req.body.title,
            urlImage: imagePost
        };
        db.messages.update(message, {returning: true, where: {id: req.params.id}})
            .then(() => res.status(201).json({message: 'Modification réussie'}))
            .catch(error => {
                console.log(error);
                res.status(400).json({error})
            });
    }
};

exports.createMessage = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const name = jwtUtils.getUserName(headerAuth);
    const lastName = jwtUtils.getUserLastName(headerAuth);
    if(userId<0 ){
        return res.status(400).json({ 'error': 'wrong token' })
    }else {
        let imagePost = '';
        if (req.file) {
            imagePost = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }
        const message = new db.messages({
            content: req.body.content,
            userId: userId,
            name: name,
            lastName: lastName,
            title: req.body.title,
            urlImage: imagePost
        });
        message
            .save()
            .then(() => res.status(201).json({message: 'Publication réussie'}))
            .catch(error => res.status(400).json({error}));
    }
};
