const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); // Création d'un compte
router.post('/login', userCtrl.login);
router.post('/getAllUser', userCtrl.getAllUser);
router.delete('/deleteUser', userCtrl.deleteUser);
router.delete('/:id', auth, userCtrl.deleteMyAccount);


module.exports = router;  //Export vers app.js