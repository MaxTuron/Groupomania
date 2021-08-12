//Import du framework express'
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//const userRoutes = require('./routes/user');

//Header - Gestion du CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //accède à l'api depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //ajoute les headers aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //envoie les requêtes avec les méthodes mentionnées
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));


//app.use('/api/user', userRoutes);

module.exports = app;