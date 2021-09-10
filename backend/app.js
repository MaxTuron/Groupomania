//Import du framework express'
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const filesDir = 'images';
const path = require('path');

const userRoutes = require('./routes/user');
const messagesRoutes = require('./routes/messages');
const commentsRoutes = require('./routes/comments');

const app = express();



//Header - Gestion du CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //accède à l'api depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //ajoute les headers aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //envoie les requêtes avec les méthodes mentionnées
    next();
});

app.use(express.json());

//Permet de créer le dossier images si il n'existe pas
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api/user', userRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/comments', commentsRoutes);

module.exports = app;