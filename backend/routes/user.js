const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); // Création d'un compte
router.post('/login', userCtrl.login); // Création d'un compte
router.post('/getProfileList', userCtrl.getProfileList); // Création d'un compte
router.post('/deleteUser', userCtrl.deleteUser); // Création d'un compte

module.exports = router;  //Export vers app.js